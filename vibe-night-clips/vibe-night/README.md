# vibe-night · Clips 🎬

A TikTok-style vertical video feed for the JHB nightlife scene, with a full Clips creator studio and multi-platform publishing (Instagram, TikTok, X).

---

## Project Structure

```
src/
├── pages/
│   └── ClipsFeed.jsx          ← Main feed page (vertical scroll-snap)
├── components/
│   ├── feed/
│   │   └── ClipCard.jsx       ← Individual clip card with like/share
│   ├── clips/
│   │   ├── ClipsCreator.jsx   ← Full 5-step creator studio
│   │   └── steps/
│   │       ├── TrimStep.jsx   ← Trim + duration + speed
│   │       ├── FilterStep.jsx ← Visual filters + adjustments
│   │       ├── SoundStep.jsx  ← Sound selection + volume mix
│   │       ├── CaptionStep.jsx← Caption + hashtags + text position
│   │       └── ShareStep.jsx  ← Platform selection + scheduling
│   └── shared/
│       └── BottomNav.jsx      ← App navigation bar
├── hooks/
│   └── useClipPublisher.js    ← Publishing state management
├── lib/
│   └── socialPublish.js       ← Instagram, TikTok, X API integrations
└── App.jsx
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Setting Up Social Publishing

### 1. Copy the env file
```bash
cp .env.example .env.local
```

### 2. Instagram (Meta)

1. Go to https://developers.facebook.com/apps and create an app
2. Add the **Instagram Graph API** product
3. Connect an Instagram **Business or Creator** account
4. Generate a long-lived access token (valid 60 days, can be refreshed)
5. Get your Instagram User ID from the Graph API Explorer
6. Fill in `VITE_IG_ACCESS_TOKEN` and `VITE_IG_USER_ID`

**Video requirements:** MP4, H.264, max 1GB, 3s–15min, 9:16 aspect ratio for Reels

### 3. TikTok

1. Go to https://developers.tiktok.com and create an app
2. Request the `video.publish` scope (requires review)
3. Implement OAuth 2.0 login to get a user access token
4. Fill in `VITE_TIKTOK_ACCESS_TOKEN`

**Note:** TikTok requires app review before publishing. During dev, use `privacy_level: "SELF_ONLY"` in `socialPublish.js`.

### 4. X (Twitter)

X API requires **OAuth 1.0a signatures** which must be computed server-side.

Create an API route in your Next.js app at `/pages/api/post-to-x.js`:

```js
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const oauth = new OAuth({
  consumer: { key: process.env.X_API_KEY, secret: process.env.X_API_SECRET },
  signature_method: "HMAC-SHA1",
  hash_function: (base, key) => crypto.createHmac("sha1", key).update(base).digest("base64"),
});

export default async function handler(req, res) {
  const { text } = req.body;
  const url = "https://api.twitter.com/2/tweets";
  const token = { key: process.env.X_ACCESS_TOKEN, secret: process.env.X_ACCESS_SECRET };
  const headers = oauth.toHeader(oauth.authorize({ url, method: "POST" }, token));

  const response = await fetch(url, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  res.json(await response.json());
}
```

Install: `npm install oauth-1.0a`

### 5. Video Storage

Before posting to any platform, videos must be at a public URL. Add your storage provider to `src/lib/socialPublish.js` in the `uploadToStorage` function.

**Recommended: Cloudinary (free tier available)**
```js
export async function uploadToStorage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
    { method: "POST", body: formData }
  );
  const { secure_url } = await res.json();
  return secure_url;
}
```

---

## Clip Specs

| Platform  | Format | Max size | Duration | Aspect |
|-----------|--------|----------|----------|--------|
| Instagram | MP4    | 1 GB     | 3s–90s   | 9:16   |
| TikTok    | MP4    | 4 GB     | 3s–60s   | 9:16   |
| X         | MP4    | 512 MB   | up to 2m20s | Any |

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Add your env vars in the Vercel dashboard under Settings → Environment Variables.
