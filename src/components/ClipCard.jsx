import { Heart, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';

export default function ClipCard({ clip }) {
  const initials = (clip.author_name || 'U').split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <Avatar className="w-9 h-9 border border-primary/20">
          <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${clip.author_email}`} />
          <AvatarFallback className="bg-primary/20 text-primary text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{clip.author_name || 'Anonymous'}</p>
          <p className="text-xs text-muted-foreground">{moment(clip.created_date).fromNow()}</p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
          {clip.type || 'clip'}
        </span>
      </div>

      {/* Media */}
      <div className="px-4 pb-3">
        {clip.media_url && (
          clip.type === 'video' ? (
            <video src={clip.media_url} controls className="w-full rounded-xl max-h-80" />
          ) : (
            <img src={clip.media_url} alt="clip" className="w-full rounded-xl object-cover max-h-80" />
          )
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3 border-t border-border/50">
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-pink-400 transition-colors group">
          <Heart className="w-4 h-4 group-hover:fill-pink-400" />
          <span className="text-xs">{clip.likes || 0}</span>
        </button>
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
