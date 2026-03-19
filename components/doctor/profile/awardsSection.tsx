import { Award, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./sectionHeader";
import { ProfileItemCard } from "./profileItemCard";
import { ActionButtons } from "./actionButtons";

interface AwardItem {
  id: number;
  title: string;
  issuer: string;
  year: string;
}

interface AwardsSectionProps {
  awards: AwardItem[];
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  const safeAwards = Array.isArray(awards.awards_info)
    ? awards.awards_info
    : [];
  console.log("Doctor Awards : ", safeAwards);
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Awards & Recognition"
        description="Your professional achievements"
        actionLabel="Add Award"
        actionIcon={<Plus className="h-4 w-4 mr-2" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {safeAwards.map((index, award) => (
          <ProfileItemCard
          key={index}
          imageSrc={award.award_image}
          imageAlt={award.title || "Award image"}
          icon={<Award className="h-6 w-6" />}
          title={award.title || "Untitled Award"}
          subtitle={award.organization || "Organization not provided"}
          description={award.description || "No description available"}
          badge={<Badge variant="secondary">{award.year || "N/A"}</Badge>}
          actions={<ActionButtons />}
          iconClassName="bg-amber-50 text-amber-500"
        />
        ))}
      </div>
    </div>
  );
}