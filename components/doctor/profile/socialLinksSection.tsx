import { Globe, Plus } from "lucide-react";
import { SectionHeader } from "./sectionHeader";
import { ProfileItemCard } from "./profileItemCard";
import { ActionButtons } from "./actionButtons";

interface SocialItem {
  id: number;
  platform: string;
  url: string;
}

interface SocialLinksSectionProps {
  socialMedia: SocialItem;
}

export default function SocialLinksSection({ socialMedia }: SocialLinksSectionProps) {

  const safeSocialMedia = Array.isArray(socialMedia.social_media)
    ? socialMedia.social_media
    : [];
  console.log("Doctor Social Media : ", safeSocialMedia);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Social Media Links"
        description="Your professional online presence"
        actionLabel="Add Link"
        actionIcon={<Plus className="h-4 w-4 mr-2" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {safeSocialMedia.length === 0 ? (
          <p className="text-center text-muted-foreground col-span-2">No social media found</p>
        ) : (
          safeSocialMedia.map((social) => (
          <ProfileItemCard
            key={social.id}
            icon={<Globe className="h-6 w-6" />}
            title={social.platform}
            subtitle={social.url}
            actions={<ActionButtons />}
          />
        ))
      )}
      </div>
    </div>
  );
}