"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function FindAlumniPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const alumni = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "Google",
      role: "Senior Software Engineer",
      batch: "2020",
      location: "Mountain View, CA",
      skills: ["React", "Python", "Machine Learning", "System Design"],
      experience: "4 years",
      compatibility: 92,
      bio: "Passionate about building scalable web applications and mentoring junior developers.",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      company: "Microsoft",
      role: "Product Manager",
      batch: "2019",
      location: "Seattle, WA",
      skills: ["Product Strategy", "Data Analysis", "Leadership", "Agile"],
      experience: "5 years",
      compatibility: 88,
      bio: "Leading product initiatives for cloud services with focus on user experience.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      company: "Amazon",
      role: "UX Designer",
      batch: "2021",
      location: "Austin, TX",
      skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
      experience: "3 years",
      compatibility: 85,
      avatar: "/professional-woman-designer.png",
      bio: "Creating intuitive user experiences for e-commerce platforms.",
    },
    {
      id: 4,
      name: "David Park",
      company: "Meta",
      role: "Data Scientist",
      batch: "2018",
      location: "Menlo Park, CA",
      skills: ["Python", "SQL", "Machine Learning", "Statistics"],
      experience: "6 years",
      compatibility: 90,
      avatar: "/professional-data-scientist.png",
      bio: "Leveraging data to drive product decisions and improve user engagement.",
    },
    {
      id: 5,
      name: "Lisa Wang",
      company: "Apple",
      role: "iOS Developer",
      batch: "2022",
      location: "Cupertino, CA",
      skills: ["Swift", "iOS", "Mobile Development", "UI/UX"],
      experience: "2 years",
      compatibility: 87,
      avatar: "/professional-woman-developer.png",
      bio: "Building innovative mobile experiences for millions of users worldwide.",
    },
    {
      id: 6,
      name: "James Thompson",
      company: "Tesla",
      role: "Software Engineer",
      batch: "2020",
      location: "Palo Alto, CA",
      skills: ["C++", "Python", "Embedded Systems", "Automotive"],
      experience: "4 years",
      compatibility: 83,
      avatar: "/professional-engineer.png",
      bio: "Developing autonomous driving software and vehicle control systems.",
    },
  ];

  const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Tesla"];
  const batches = ["2018", "2019", "2020", "2021", "2022", "2023"];

  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCompany =
      companyFilter === "all" || person.company === companyFilter;
    const matchesBatch = batchFilter === "all" || person.batch === batchFilter;

    return matchesSearch && matchesCompany && matchesBatch;
  });

  return (
    <DashboardLayout userRole="student" title="Find Alumni">
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Discover Alumni</CardTitle>
            <CardDescription>
              Connect with alumni based on your interests and career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, role, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAlumni.map((person) => (
            <Card key={person.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={person.avatar || "/placeholder.svg"}
                      alt={person.name}
                    />
                    <AvatarFallback className="text-lg">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{person.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Briefcase className="w-3 h-3" />
                          {person.role} at {person.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary">
                        <Star className="w-3 h-3 fill-current" />
                        {person.compatibility}%
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Batch {person.batch}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {person.location}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground text-pretty">
                        {person.bio}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 4).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {person.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{person.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Connect
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No alumni found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
