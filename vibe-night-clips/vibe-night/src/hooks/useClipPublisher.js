import { useState } from "react";
import { publishClip, uploadToStorage } from "../lib/socialPublish";

export function useClipPublisher() {
  const [status, setStatus] = useState("idle"); // idle | uploading | publishing | done | error
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const publish = async ({ videoFile, videoUrl, caption, tags, platforms, scheduleType }) => {
    setStatus("uploading");
    setError(null);

    try {
      let publicUrl = videoUrl;

      // If user selected a local file, upload it first
      if (videoFile) {
        publicUrl = await uploadToStorage(videoFile);
      }

      setStatus("publishing");

      // Only post to real platforms if not scheduled
      if (scheduleType === "now") {
        const res = await publishClip({ platforms, videoUrl: publicUrl, caption, tags });
        setResults(res);
      } else {
        // TODO: store schedule in your database and publish via cron job / queue
        setResults({ scheduled: true, time: scheduleType });
      }

      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setResults(null);
    setError(null);
  };

  return { publish, status, results, error, reset };
}
