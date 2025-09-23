"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Linkedin,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Search,
  Users,
  Globe,
  Twitter,
} from "lucide-react";

export function LinkedInSyncModal({ open, onOpenChange }) {
  const [step, setStep] = useState("connect"); // connect, search, preview, syncing, complete
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [syncResults, setSyncResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const socialPlatforms = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      connected: false,
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      color: "text-gray-900",
      bgColor: "bg-gray-100",
      connected: false,
    },
    {
      id: "github",
      name: "GitHub",
      icon: Globe,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      connected: false,
    },
  ];

  const mockSearchResults = [
    {
      id: 1,
      name: "Sarah Chen",
      headline: "Senior Software Engineer at Google",
      location: "San Francisco, CA",
      profileUrl: "https://linkedin.com/in/sarahchen",
      avatar: "/images/default-avatar.png",
      company: "Google",
      experience: "5+ years",
      connections: "500+",
      verified: true,
      matchScore: 95,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      headline: "Principal Product Manager at Microsoft",
      location: "Seattle, WA",
      profileUrl: "https://linkedin.com/in/michaelrodriguez",
      avatar: "/images/default-avatar.png",
      company: "Microsoft",
      experience: "7+ years",
      connections: "1000+",
      verified: true,
      matchScore: 92,
    },
    {
      id: 3,
      name: "Emily Johnson",
      headline: "iOS Developer at Apple",
      location: "Cupertino, CA",
      profileUrl: "https://linkedin.com/in/emilyjohnson",
      avatar: "/images/default-avatar.png",
      company: "Apple",
      experience: "4+ years",
      connections: "300+",
      verified: false,
      matchScore: 88,
    },
  ];

  const handleConnect = async (platform) => {
    setConnectionStatus("connecting");
    // Simulate OAuth connection
    setTimeout(() => {
      setConnectionStatus("connected");
    }, 2000);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsSearching(false);
      setStep("preview");
    }, 1500);
  };

  const handleProfileToggle = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const handleSync = async () => {
    setStep("syncing");
    setProgress(0);

    // Simulate sync process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("complete");
          setSyncResults({
            total: selectedProfiles.length,
            imported: selectedProfiles.length - 1,
            duplicates: 1,
            errors: 0,
            verified: selectedProfiles.length - 2,
          });
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  const handleReset = () => {
    setStep("connect");
    setSearchQuery("");
    setSearchResults([]);
    setSelectedProfiles([]);
    setProgress(0);
    setSyncResults(null);
    setConnectionStatus(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Linkedin className="w-6 h-6 text-purple-600" />
            Fetch from Social Profiles
            {step !== "connect" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("connect")}
                className="ml-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            Connect alumni accounts or fetch public profile data from social platforms
          </DialogDescription>
        </DialogHeader>

        {step === "connect" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connect Social Platforms</CardTitle>
                <CardDescription>
                  Connect to social platforms to access alumni profile data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialPlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bgColor}`}>
                          <IconComponent className={`w-5 h-5 ${platform.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{platform.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Access public profile information
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {connectionStatus === "connected" && platform.id === "linkedin" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleConnect(platform.id)}
                            disabled={connectionStatus === "connecting"}
                          >
                            {connectionStatus === "connecting" && platform.id === "linkedin" ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <ExternalLink className="w-4 h-4 mr-2" />
                            )}
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-purple-50/50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Privacy Notice</h4>
                    <p className="text-sm text-purple-700">
                      We only access publicly available profile information. 
                      Private data and connections are never accessed without explicit permission.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "search" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Alumni Profiles</CardTitle>
                <CardDescription>
                  Search for alumni profiles on connected platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="search-query">Search Query</Label>
                    <Input
                      id="search-query"
                      placeholder="e.g., 'University Name Alumni' or 'Computer Science 2020'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery.trim() || isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4 mr-2" />
                      )}
                      Search
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label className="text-sm font-medium">Search Filters</Label>
                    <div className="space-y-2 mt-1">
                      <Badge variant="outline">University Alumni</Badge>
                      <Badge variant="outline">Graduation Year: 2020-2024</Badge>
                      <Badge variant="outline">Location: Global</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Data Sources</Label>
                    <div className="space-y-2 mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Linkedin className="w-3 h-3 mr-1" />
                        LinkedIn
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Results</CardTitle>
                <CardDescription>
                  Found {searchResults.length} potential alumni profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedProfiles.length === searchResults.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProfiles(searchResults.map((r) => r.id));
                            } else {
                              setSelectedProfiles([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Profile</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Match</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProfiles.includes(profile.id)}
                            onCheckedChange={() => handleProfileToggle(profile.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={profile.avatar} alt={profile.name} />
                              <AvatarFallback>
                                {profile.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{profile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {profile.headline}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{profile.company}</p>
                            <p className="text-sm text-muted-foreground">
                              {profile.experience}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{profile.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              profile.matchScore >= 90
                                ? "bg-green-50 text-green-700 border-green-200"
                                : profile.matchScore >= 80
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {profile.matchScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {profile.verified ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline">Unverified</Badge>
                            )}
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {selectedProfiles.length > 0 && (
              <Card className="bg-purple-50/50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-purple-900">Import Summary</h4>
                      <p className="text-sm text-purple-700">
                        {selectedProfiles.length} profiles selected for import
                      </p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {selectedProfiles.length} profiles
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === "syncing" && (
          <div className="space-y-6 py-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Linkedin className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Importing Profiles</h3>
                <p className="text-muted-foreground">
                  Fetching data from {selectedProfiles.length} social profiles...
                </p>
              </div>
              <div className="w-full max-w-md mx-auto">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {progress}% complete
                </p>
              </div>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import Complete</h3>
                <p className="text-muted-foreground">
                  Alumni profiles have been successfully imported
                </p>
              </div>
            </div>

            {syncResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Import Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Profiles:</span>
                        <span className="font-medium">{syncResults.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Successfully Imported:</span>
                        <span className="font-medium text-green-600">
                          {syncResults.imported}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duplicates Skipped:</span>
                        <span className="font-medium text-yellow-600">
                          {syncResults.duplicates}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Verified Profiles:</span>
                        <span className="font-medium text-blue-600">
                          {syncResults.verified}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Errors:</span>
                        <span className="font-medium text-red-600">
                          {syncResults.errors}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <DialogFooter>
          {step === "connect" && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep("search")}
                disabled={connectionStatus !== "connected"}
              >
                Continue
              </Button>
            </>
          )}
          {step === "search" && (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
            </>
          )}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={() => setStep("search")}>
                Back to Search
              </Button>
              <Button
                onClick={handleSync}
                disabled={selectedProfiles.length === 0}
              >
                Import {selectedProfiles.length} Profiles
              </Button>
            </>
          )}
          {step === "complete" && (
            <>
              <Button variant="outline" onClick={handleReset}>
                Import More
              </Button>
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
