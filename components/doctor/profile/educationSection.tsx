import { GraduationCap, MapPin, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./sectionHeader";
import { ProfileItemCard } from "./profileItemCard";
import { ActionButtons } from "./actionButtons";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  year: string;
}

interface EducationSectionProps {
  education: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  const safeEducation = Array.isArray(education.education_info)
    ? education.education_info
    : [];
  console.log("Doctor Education : ", safeEducation);
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Education History"
        description="Your academic qualifications"
        actionLabel="Add Education"
        actionIcon={<Plus className="h-4 w-4 mr-2" />}
      />

      <div className="space-y-4">
        {safeEducation.map((edu, index) => (
          <ProfileItemCard
            key={index}
            icon={<GraduationCap className="h-6 w-6" />}
            title={edu.degree}
            subtitle={edu.institution}
            meta={edu.location}
            badge={<Badge variant="secondary">{edu.year}</Badge>}
            actions={<ActionButtons />}
          />
        ))}
      </div>
    </div>
  );
}