import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function CreatePostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // TODO: Replace with new auth logic
    setUser(null); // Placeholder
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setSubmitting(true);
    // TODO: Replace with new post creation logic
    setContent('');
    setSubmitting(false);
    onPostCreated?.(null);
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/50 p-4">
      <div className="flex gap-3">
        {/* Avatar, AvatarImage, and AvatarFallback props are correct for Radix UI. */}
        <Avatar className="w-9 h-9 border border-primary/20 flex-shrink-0">
          <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user.email}`} />
          <AvatarFallback className="bg-primary/20 text-primary text-xs">
            {(user.full_name || 'U')[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share what's happening tonight..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[60px]"
            rows={2}
          />
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              size="sm"
              disabled={!content.trim() || submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}