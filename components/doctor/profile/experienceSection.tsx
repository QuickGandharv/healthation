import { Briefcase, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./sectionHeader";
import { ProfileItemCard } from "./profileItemCard";
import { ActionButtons } from "./actionButtons";

interface ExperienceSectionProps {
  experience?: ExperienceItem[];
}

export default function ExperienceSection({
  experience = [],
}: ExperienceSectionProps) {
  const safeExperience = Array.isArray(experience.professional_experience_info)
    ? experience.professional_experience_info
    : [];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Working Experience"
        description="Your professional work history"
        actionLabel="Add Experience"
        actionIcon={<Plus className="h-4 w-4 mr-2" />}
      />

      <div className="space-y-4">
        {safeExperience?.map((exp, index) => (
          <ProfileItemCard
            key={index}
            icon={<Briefcase className="h-6 w-6" />}
            title={exp.past_associations}
            meta={`${exp.career_start}`}
            badge={
              exp.current ? (
                <Badge className="bg-primary/10 text-primary">Current</Badge>
              ) : undefined
            }
            description={exp.description}
            actions={<ActionButtons />}
          />
        ))}
      </div>
    </div>
  );
}