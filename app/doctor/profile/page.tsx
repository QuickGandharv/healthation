"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDoctorProfile } from "@/queries/doctor/useProfile";
import { updateDoctorProfile } from "@/api/doctor/profile";
import { useAuth } from "@/context/AuthContext";

import ProfileHeader from "@/components/doctor/profile/profileHeader";
import PersonalInfoSection from "@/components/doctor/profile/personalInfoSection";
import AddressSection from "@/components/doctor/profile/addressSection";
import ExperienceSection from "@/components/doctor/profile/experienceSection";
import EducationSection from "@/components/doctor/profile/educationSection";
import AwardsSection from "@/components/doctor/profile/awardsSection";
import CertificatesSection from "@/components/doctor/profile/certificatesSection";
import SocialLinksSection from "@/components/doctor/profile/socialLinksSection";
import ReviewsSection from "@/components/doctor/profile/reviewsSection";

import type {
  PersonalInformationData,
  AddressItem,
  ExperienceItem,
  EducationItem,
  AwardItem,
  CertificateItem,
  SocialMediaItem,
} from "@/types/doctor/profile";

export default function Profile() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useAuth();
  const doctorID = user?.id || "";

  const personalQuery = useDoctorProfile<PersonalInformationData>(
    doctorID,
    "personal_information"
  );

  const addressQuery = useDoctorProfile<AddressItem>(
    doctorID,
    "address"
  );

  const experienceQuery = useDoctorProfile<ExperienceItem>(
    doctorID,
    "working_experience"
  );

  const educationQuery = useDoctorProfile<EducationItem>(
    doctorID,
    "education_info"
  );

  const awardsQuery = useDoctorProfile<AwardItem>(
    doctorID,
    "awards_info"
  );

  const certificatesQuery = useDoctorProfile<CertificateItem[]>(
    doctorID,
    "certifications_info"
  );

  console.log("certificates query : ", certificatesQuery);

  const socialQuery = useDoctorProfile<SocialMediaItem>(
    doctorID,
    "social_media"
  );

  console.log("social query : ", socialQuery);

  const profileData = personalQuery.data?.data;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    phone: "",
    license: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        bio: profileData.bio || "",
        phone: profileData.phone || "",
        license: profileData.license || "",
      });
    }
  }, [profileData]);

  const fullName = useMemo(() => {
    const first = profileData?.first_name || "";
    const last = profileData?.last_name || "";
    return `${first} ${last}`.trim() || "Doctor";
  }, [profileData]);

  const initials = useMemo(() => {
    const first = profileData?.first_name?.[0] || "";
    const last = profileData?.last_name?.[0] || "";
    return `${first}${last}`.toUpperCase() || "DR";
  }, [profileData]);

  const primaryDepartment =
    profileData?.doctor_departments?.[0]?.department_name || "Not Added";

  const primaryRole =
    profileData?.doctor_departments?.[0]?.role || "";

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancelPersonalEdit = () => {
    setIsEditingPersonal(false);

    if (profileData) {
      setFormData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        bio: profileData.bio || "",
        phone: profileData.phone || "",
        license: profileData.license || "",
      });
    }
  };

  const handleSavePersonalInfo = async () => {
    try {
      setIsSaving(true);

      await updateDoctorProfile<PersonalInformationData>({
        doctorID,
        group: "personal_information",
        payload: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          bio: formData.bio,
          phone: formData.phone,
          license: formData.license,
        },
      });

      await personalQuery.refetch();
      setIsEditingPersonal(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const address = addressQuery.data?.data || null;
  const experience = experienceQuery.data?.data || [];
  const education = educationQuery.data?.data || [];
  const awards = awardsQuery.data?.data || [];
  const certificates = certificatesQuery.data?.data || [];
  const socialMedia = socialQuery.data?.data || [];

  // Keep static only until you have a reviews API
  const reviews = [
    {
      id: 1,
      patient: "Michael C.",
      rating: 5,
      date: "March 8, 2026",
      comment:
        "Dr. Johnson is exceptional! Very thorough and takes time to listen to all concerns.",
    },
    {
      id: 2,
      patient: "Emma W.",
      rating: 5,
      date: "March 5, 2026",
      comment:
        "Highly recommend! Dr. Johnson explained everything clearly and made me feel comfortable.",
    },
  ];

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const isLoading =
    personalQuery.isLoading ||
    addressQuery.isLoading ||
    experienceQuery.isLoading ||
    educationQuery.isLoading ||
    awardsQuery.isLoading ||
    certificatesQuery.isLoading ||
    socialQuery.isLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        fullName={fullName}
        avatar={profileData?.avatar}
        initials={initials}
        department={primaryDepartment}
        role={primaryRole}
        email={profileData?.email}
        phone={formData.phone}
        license={formData.license}
        averageRating={averageRating}
        reviewsCount={reviews.length}
      />

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-6">
          <PersonalInfoSection
            isEditing={isEditingPersonal}
            setIsEditing={setIsEditingPersonal}
            formData={formData}
            profileData={profileData}
            fullName={fullName}
            primaryDepartment={primaryDepartment}
            primaryRole={primaryRole}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSavePersonalInfo}
            onCancel={handleCancelPersonalEdit}
          />
        </TabsContent>

        <TabsContent value="address" className="space-y-4 mt-6">
          <AddressSection address={address} />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 mt-6">
          <ExperienceSection experience={experience} />
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-6">
          <EducationSection education={education} />
        </TabsContent>

        <TabsContent value="awards" className="space-y-4 mt-6">
          <AwardsSection awards={awards} />
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4 mt-6">
          <CertificatesSection certificates={certificates} />
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-6">
          <SocialLinksSection socialMedia={socialMedia} />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4 mt-6">
          <ReviewsSection reviews={reviews} averageRating={averageRating} />
        </TabsContent>
      </Tabs>
    </div>
  );
}