import { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Link } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonProps {
  mood: string | null;
  placesCount: number;
}

const ShareButton = ({ mood, placesCount }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = mood
    ? `🗺️ I found ${placesCount} amazing "${mood}" spots on MoodMap! Check it out:`
    : `🗺️ Check out MoodMap — find places that match your mood!`;

  const shareUrl = window.location.origin;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "MoodMap", text: shareText, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-xl">
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyToClipboard} className="gap-2 cursor-pointer">
          {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareWhatsApp} className="gap-2 cursor-pointer">
          <MessageCircle className="w-4 h-4" />
          Share via WhatsApp
        </DropdownMenuItem>
        {typeof navigator.share === "function" && (
          <DropdownMenuItem onClick={shareNative} className="gap-2 cursor-pointer">
            <Link className="w-4 h-4" />
            More options...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
