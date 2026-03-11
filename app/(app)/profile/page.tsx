"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText,
  Globe,
  Star,
  Edit,
  Plus,
  Trash2,
  Camera
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Profile() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  const personalInfo = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@healthcare.com",
    phone: "+1 (555) 123-4567",
    specialty: "Internal Medicine",
    license: "MD-123456",
    bio: "Board-certified internal medicine physician with over 10 years of experience in patient care and telehealth services."
  };

  const addresses = [
    {
      id: 1,
      type: "Primary Clinic",
      street: "123 Medical Plaza",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      isPrimary: true
    },
    {
      id: 2,
      type: "Secondary Office",
      street: "456 Healthcare Ave",
      city: "Oakland",
      state: "CA",
      zip: "94612",
      isPrimary: false
    }
  ];

  const experience = [
    {
      id: 1,
      title: "Senior Physician",
      organization: "HealthCare Medical Center",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description: "Leading telehealth initiatives and managing patient care"
    },
    {
      id: 2,
      title: "Internal Medicine Physician",
      organization: "Bay Area Hospital",
      location: "Oakland, CA",
      startDate: "Jun 2015",
      endDate: "Dec 2019",
      current: false,
      description: "Provided comprehensive care to diverse patient population"
    }
  ];

  const education = [
    {
      id: 1,
      degree: "Doctor of Medicine (MD)",
      institution: "Stanford University School of Medicine",
      location: "Stanford, CA",
      year: "2015"
    },
    {
      id: 2,
      degree: "Bachelor of Science in Biology",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      year: "2011"
    }
  ];

  const awards = [
    {
      id: 1,
      title: "Excellence in Patient Care Award",
      issuer: "American Medical Association",
      year: "2024"
    },
    {
      id: 2,
      title: "Top Telehealth Provider",
      issuer: "HealthCare Innovation Board",
      year: "2023"
    },
    {
      id: 3,
      title: "Research Excellence Award",
      issuer: "Medical Research Institute",
      year: "2022"
    }
  ];

  const certificates = [
    {
      id: 1,
      name: "Board Certification - Internal Medicine",
      issuer: "American Board of Internal Medicine",
      issueDate: "2016",
      expiryDate: "2026"
    },
    {
      id: 2,
      name: "Advanced Cardiac Life Support (ACLS)",
      issuer: "American Heart Association",
      issueDate: "2024",
      expiryDate: "2026"
    },
    {
      id: 3,
      name: "Telehealth Certification",
      issuer: "American Telemedicine Association",
      issueDate: "2023",
      expiryDate: "2025"
    }
  ];

  const socialMedia = [
    { id: 1, platform: "LinkedIn", url: "linkedin.com/in/sarahjohnson" },
    { id: 2, platform: "Twitter", url: "twitter.com/drsjohnson" },
    { id: 3, platform: "Professional Website", url: "drsarahjohnson.com" }
  ];

  const reviews = [
    {
      id: 1,
      patient: "Michael C.",
      rating: 5,
      date: "March 8, 2026",
      comment: "Dr. Johnson is exceptional! Very thorough and takes time to listen to all concerns. The telehealth experience was smooth and professional."
    },
    {
      id: 2,
      patient: "Emma W.",
      rating: 5,
      date: "March 5, 2026",
      comment: "Highly recommend! Dr. Johnson explained everything clearly and made me feel comfortable throughout the consultation."
    },
    {
      id: 3,
      patient: "James R.",
      rating: 5,
      date: "March 2, 2026",
      comment: "Outstanding care and expertise. The follow-up was excellent and I'm very satisfied with the treatment plan."
    },
    {
      id: 4,
      patient: "Alice J.",
      rating: 4,
      date: "February 28, 2026",
      comment: "Great doctor with excellent bedside manner. Very knowledgeable and professional."
    }
  ];

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src="" alt="Dr. Sarah Johnson" />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">SJ</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="mb-1">{personalInfo.name}</h1>
              <p className="text-muted-foreground mb-3">{personalInfo.specialty}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Mail className="h-3 w-3 mr-1" />
                  {personalInfo.email}
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Phone className="h-3 w-3 mr-1" />
                  {personalInfo.phone}
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  License: {personalInfo.license}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{averageRating}</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.round(parseFloat(averageRating)) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{reviews.length} reviews</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-4 mt-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and bio</CardDescription>
              </div>
              <Button 
                variant="outline"
                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditingPersonal ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingPersonal ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={personalInfo.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input id="specialty" defaultValue={personalInfo.specialty} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={personalInfo.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={personalInfo.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" defaultValue={personalInfo.license} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      defaultValue={personalInfo.bio}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsEditingPersonal(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">{personalInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Specialty</p>
                      <p className="font-medium">{personalInfo.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{personalInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{personalInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">License Number</p>
                      <p className="font-medium">{personalInfo.license}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bio</p>
                    <p className="text-sm">{personalInfo.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses */}
        <TabsContent value="addresses" className="space-y-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3>Address Management</h3>
              <p className="text-sm text-muted-foreground">Manage your practice locations</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                  <DialogDescription>Add a new practice location</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address-type">Address Type</Label>
                    <Input id="address-type" placeholder="e.g., Primary Clinic" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-primary hover:bg-primary/90">Add Address</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <Card key={address.id} className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{address.type}</CardTitle>
                    </div>
                    {address.isPrimary && (
                      <Badge className="bg-primary text-primary-foreground">Primary</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm">{address.street}</p>
                    <p className="text-sm">{address.city}, {address.state} {address.zip}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience" className="space-y-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3>Working Experience</h3>
              <p className="text-sm text-muted-foreground">Your professional work history</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <Card key={exp.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.organization}</p>
                        </div>
                        {exp.current && (
                          <Badge className="bg-primary/10 text-primary">Current</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {exp.location} • {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="text-sm">{exp.description}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education" className="space-y-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3>Education History</h3>
              <p className="text-sm text-muted-foreground">Your academic qualifications</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        </div>
                        <Badge variant="secondary">{edu.year}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {edu.location}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Awards */}
        <TabsContent value="awards" className="space-y-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3>Awards & Recognition</h3>
              <p className="text-sm text-muted-foreground">Your professional achievements</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {awards.map((award) => (
              <Card key={award.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{award.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{award.issuer}</p>
                      <Badge variant="secondary">{award.year}</Badge>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certificates */}
        <TabsContent value="certificates" className="space-y-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3>Certificates & Licenses</h3>
              <p className="text-sm text-muted-foreground">Your professional certifications</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </div>

          <div className="space-y-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Badge variant="secondary">Valid</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social" className="space-y-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3>Social Media Links</h3>
              <p className="text-sm text-muted-foreground">Your professional online presence</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {socialMedia.map((social) => (
              <Card key={social.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{social.platform}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{social.url}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews" className="space-y-4 mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Patient Feedback</CardTitle>
              <CardDescription>
                Average rating: {averageRating} out of 5 ({reviews.length} reviews)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-border bg-accent/30 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {review.patient.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.patient}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
