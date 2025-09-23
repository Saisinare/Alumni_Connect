"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Database,
  Linkedin,
  FileSpreadsheet,
  Users,
  ArrowRight,
} from "lucide-react";
import { CSVUploadModal } from "./csv-upload-modal";
import { ERPSyncModal } from "./erp-sync-modal";
import { LinkedInSyncModal } from "./linkedin-sync-modal";

export function AddAlumniModal({ open, onOpenChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  const options = [
    {
      id: "csv",
      title: "Upload CSV/Excel File",
      description: "Import alumni data in bulk from spreadsheet files",
      icon: FileSpreadsheet,
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-50",
    },
    {
      id: "erp",
      title: "Sync from ERP",
      description: "Connect to your ERP system to fetch alumni data",
      icon: Database,
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-50",
    },
    {
      id: "linkedin",
      title: "Fetch from Social Profiles",
      description: "Import alumni data from LinkedIn and other social platforms",
      icon: Linkedin,
      color: "bg-purple-100 text-purple-600",
      hoverColor: "hover:bg-purple-50",
    },
  ];

  return (
    <>
      <Dialog open={open && !selectedOption} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Users className="w-6 h-6 text-purple-600" />
              Add Alumni Data
            </DialogTitle>
            <DialogDescription>
              Choose how you'd like to add new alumni to your directory
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {options.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md border-0 bg-gradient-to-br from-white to-gray-50/30 ${option.hoverColor}`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${option.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{option.title}</h3>
                          <p className="text-muted-foreground text-sm">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-modals for each option */}
      <CSVUploadModal
        open={selectedOption === "csv"}
        onOpenChange={(open) => {
          if (!open) handleBack();
        }}
      />
      <ERPSyncModal
        open={selectedOption === "erp"}
        onOpenChange={(open) => {
          if (!open) handleBack();
        }}
      />
      <LinkedInSyncModal
        open={selectedOption === "linkedin"}
        onOpenChange={(open) => {
          if (!open) handleBack();
        }}
      />
    </>
  );
}
