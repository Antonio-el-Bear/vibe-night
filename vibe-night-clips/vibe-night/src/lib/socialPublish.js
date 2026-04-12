/**
 * vibe-night Social Publishing API
 * Handles posting Clips to Instagram, TikTok, and X (Twitter)
 *
 * SETUP:
 * Create a .env file in your project root with the following keys:
 *   VITE_IG_ACCESS_TOKEN=your_instagram_access_token
 *   VITE_IG_USER_ID=your_instagram_user_id
 *   VITE_TIKTOK_ACCESS_TOKEN=your_tiktok_access_token
 *   VITE_X_API_KEY=your_x_api_key
 *   VITE_X_API_SECRET=your_x_api_secret
 *   VITE_X_ACCESS_TOKEN=your_x_access_token
 *   VITE_X_ACCESS_SECRET=your_x_access_secret
 *
 * NOTE: For production, these API calls should be made server-side
 * (e.g. via Next.js API routes or a Node/Express backend) to protect your keys.
 */

// ─── INSTAGRAM (Meta Content Publishing API) ────────────────────────────────

/**
 * Posts a video as an Instagram Reel.
 * Requires: Instagram Business/Creator account + approved Meta app
 * Docs: https://developers.facebook.com/docs/instagram-api/reference/ig-user/media
 */
export async function postToInstagram({ videoUrl, caption }) {
  const userId = import.meta.env.VITE_IG_USER_ID;
  const token  = import.meta.env.VITE_IG_ACCESS_TOKEN;

  // Step 1: Create media container
  const createRes = await fetch(
    `https://graph.instagram.com/v18.0/${userId}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_type: "REELS",
        video_url: videoUrl,       // Must be a publicly accessible URL
        caption,
        access_token: token,
        share_to_feed: true,
      }),
    }
  );
  const { id: containerId, error: createError } = await createRes.json();
  if (createError) throw new Error(`Instagram create error: ${createError.message}`);

  // Step 2: Poll until container is ready (video processing can take ~30s)
  await pollUntilReady(containerId, token);

  // Step 3: Publish
  const publishRes = await fetch(
    `https://graph.instagram.com/v18.0/${userId}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creation_id: containerId, access_token: token }),
    }
  );
  const { id: postId, error: publishError } = await publishRes.json();
  if (publishError) throw new Error(`Instagram publish error: ${publishError.message}`);
  return { platform: "instagram", postId };
}

async function pollUntilReady(containerId, token, retries = 10) {
  for (let i = 0; i < retries; i++) {
    await sleep(3000);
    const res = await fetch(
      `https://graph.instagram.com/v18.0/${containerId}?fields=status_code&access_token=${token}`
    );
    const { status_code } = await res.json();
    if (status_code === "FINISHED") return;
    if (status_code === "ERROR") throw new Error("Instagram video processing failed");
  }
  throw new Error("Instagram processing timeout");
}


// ─── TIKTOK (TikTok Content Posting API) ────────────────────────────────────

/**
 * Posts a video to TikTok.
 * Requires: TikTok for Developers account + approved app with video.publish scope
 * Docs: https://developers.tiktok.com/doc/content-posting-api-get-started
 */
export async function postToTikTok({ videoUrl, caption }) {
  const token = import.meta.env.VITE_TIKTOK_ACCESS_TOKEN;

  // Step 1: Initialize upload
  const initRes = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      post_info: {
        title: caption.slice(0, 150),
        privacy_level: "SELF_ONLY", // Change to "PUBLIC_TO_EVERYONE" for live posts
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: "PULL_FROM_URL",
        video_url: videoUrl,
      },
    }),
  });

  const { data, error } = await initRes.json();
  if (error?.code !== "ok") throw new Error(`TikTok error: ${error?.message}`);
  return { platform: "tiktok", publishId: data.publish_id };
}


// ─── X / TWITTER (X API v2) ─────────────────────────────────────────────────

/**
 * Posts a video to X (Twitter).
 * Requires: X Developer account + app with Read/Write permissions + paid Basic tier
 * Docs: https://developer.x.com/en/docs/x-api/tweets/manage-tweets/api-reference/post-tweets
 *
 * NOTE: X video upload is a 3-step chunked upload process.
 * For simplicity this posts text only — full video upload requires a server-side proxy.
 */
export async function postToX({ caption, tags, videoUrl }) {
  const fullText = `${caption}\n\n${tags.join(" ")}\n\nvibe-night.vercel.app`;

  // NOTE: X API requires OAuth 1.0a signatures — this MUST be done server-side.
  // Call your own backend endpoint instead:
  const res = await fetch("/api/post-to-x", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: fullText, videoUrl }),
  });

  if (!res.ok) throw new Error("X post failed");
  const data = await res.json();
  return { platform: "x", tweetId: data.data?.id };
}


// ─── UNIFIED PUBLISHER ───────────────────────────────────────────────────────

/**
 * Posts a Clip to all selected platforms simultaneously.
 * Returns results per platform (success or error).
 */
export async function publishClip({ platforms, videoUrl, caption, tags }) {
  const fullCaption = `${caption}\n\n${tags.join(" ")}`;
  const results = {};

  const tasks = platforms.map(async (platform) => {
    try {
      switch (platform) {
        case "instagram":
          results.instagram = await postToInstagram({ videoUrl, caption: fullCaption });
          break;
        case "tiktok":
          results.tiktok = await postToTikTok({ videoUrl, caption: fullCaption });
          break;
        case "x":
          results.x = await postToX({ caption, tags, videoUrl });
          break;
        default:
          results[platform] = { platform, status: "not_implemented" };
      }
    } catch (err) {
      results[platform] = { platform, error: err.message };
    }
  });

  await Promise.allSettled(tasks);
  return results;
}


// ─── HELPERS ─────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * Uploads a video file to your own storage (e.g. Supabase, S3, Cloudinary)
 * and returns a public URL — required before calling any platform API.
 *
 * Replace this with your actual storage upload logic.
 */
export async function uploadToStorage(file) {
  const formData = new FormData();
  formData.append("file", file);

  // Example: Cloudinary upload
  // const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
  //   method: "POST",
  //   body: formData,
  // });
  // const { secure_url } = await res.json();
  // return secure_url;

  // Placeholder — replace with your storage solution
  throw new Error("uploadToStorage: implement your storage provider (Cloudinary, S3, Supabase)");
}
