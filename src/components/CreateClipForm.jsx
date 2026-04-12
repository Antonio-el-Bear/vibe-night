import { useState } from 'react';
import { Send, UploadCloud } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function CreateClipForm({ onClipCreated }) {
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null); // Replace with actual user logic
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!media || !user) return;
    setSubmitting(true);
    // TODO: Replace with actual upload logic
    setMedia(null);
    setPreview(null);
    setSubmitting(false);
    onClipCreated?.({
      id: Date.now(),
      author_name: user?.full_name || 'Anonymous',
      author_email: user?.email || '',
      created_date: new Date(),
      type: media.type.startsWith('video') ? 'video' : 'image',
      media_url: preview,
    });
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/50 p-4 mb-4">
      <div className="flex gap-3 items-start">
        <Avatar className="w-9 h-9 border border-primary/20 flex-shrink-0">
          <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.email}`} />
          <AvatarFallback className="bg-primary/20 text-primary text-xs">
            {(user?.full_name || 'U')[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-xl p-4 cursor-pointer hover:bg-primary/5 transition mb-2">
            <UploadCloud className="w-6 h-6 mb-1 text-primary" />
            <span className="text-xs text-muted-foreground">Click to upload a video or image clip</span>
            <input type="file" accept="video/*,image/*" className="hidden" onChange={handleFileChange} />
          </label>
          {preview && (
            <div className="mt-2">
              {media?.type.startsWith('video') ? (
                <video src={preview} controls className="w-full rounded-xl max-h-60" />
              ) : (
                <img src={preview} alt="preview" className="w-full rounded-xl max-h-60 object-cover" />
              )}
            </div>
          )}
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              size="sm"
              disabled={!media || submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Post Clip
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
