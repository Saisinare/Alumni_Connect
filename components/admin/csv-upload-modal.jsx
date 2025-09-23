"use client";

import { useState, useRef } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  Download,
} from "lucide-react";

export function CSVUploadModal({ open, onOpenChange }) {
  const [step, setStep] = useState("upload"); // upload, preview, processing, complete
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [fieldMapping, setFieldMapping] = useState({});
  const [progress, setProgress] = useState(0);
  const [duplicates, setDuplicates] = useState([]);
  const [importResults, setImportResults] = useState(null);
  const fileInputRef = useRef(null);

  const requiredFields = [
    { key: "name", label: "Full Name", required: true },
    { key: "email", label: "Email", required: true },
    { key: "phone", label: "Phone", required: false },
    { key: "company", label: "Company", required: false },
    { key: "position", label: "Position", required: false },
    { key: "batch", label: "Batch/Year", required: true },
    { key: "location", label: "Location", required: false },
    { key: "linkedin", label: "LinkedIn URL", required: false },
  ];

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simulate CSV parsing
      const mockData = [
        {
          "Full Name": "John Doe",
          "Email Address": "john.doe@email.com",
          "Phone Number": "+1 (555) 123-4567",
          "Current Company": "Google",
          "Job Title": "Software Engineer",
          "Graduation Year": "2020",
          "City": "San Francisco, CA",
          "LinkedIn": "https://linkedin.com/in/johndoe",
        },
        {
          "Full Name": "Jane Smith",
          "Email Address": "jane.smith@email.com",
          "Phone Number": "+1 (555) 234-5678",
          "Current Company": "Microsoft",
          "Job Title": "Product Manager",
          "Graduation Year": "2019",
          "City": "Seattle, WA",
          "LinkedIn": "https://linkedin.com/in/janesmith",
        },
      ];
      setCsvData(mockData);
      setStep("preview");
    }
  };

  const handleFieldMapping = (csvField, systemField) => {
    setFieldMapping((prev) => ({
      ...prev,
      [systemField]: csvField,
    }));
  };

  const handleImport = async () => {
    setStep("processing");
    setProgress(0);

    // Simulate import process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("complete");
          setImportResults({
            total: csvData.length,
            imported: csvData.length - 1,
            duplicates: 1,
            errors: 0,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    // Simulate duplicate detection
    setDuplicates([
      {
        name: "John Doe",
        email: "john.doe@email.com",
        reason: "Email already exists",
      },
    ]);
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setCsvData([]);
    setFieldMapping({});
    setProgress(0);
    setDuplicates([]);
    setImportResults(null);
  };

  const csvHeaders = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileSpreadsheet className="w-6 h-6 text-green-600" />
            Upload CSV/Excel File
            {step !== "upload" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("upload")}
                className="ml-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            Import alumni data from CSV or Excel files
          </DialogDescription>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-6">
            <Card className="border-dashed border-2 border-muted-foreground/25">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Upload your file</h3>
                    <p className="text-muted-foreground">
                      Drag and drop or click to select CSV/Excel files
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Required Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your CSV/Excel file should contain the following columns:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {requiredFields.map((field) => (
                      <div key={field.key} className="flex items-center gap-2">
                        <Badge
                          variant={field.required ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {field.required ? "Required" : "Optional"}
                        </Badge>
                        <span className="text-sm">{field.label}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Field Mapping</CardTitle>
                <CardDescription>
                  Map your CSV columns to the system fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {requiredFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        {field.label}
                        {field.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </label>
                      <Select
                        value={fieldMapping[field.key] || ""}
                        onValueChange={(value) => handleFieldMapping(value, field.key)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select CSV column" />
                        </SelectTrigger>
                        <SelectContent>
                          {csvHeaders.map((header) => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Preview</CardTitle>
                <CardDescription>
                  Preview of {csvData.length} records to be imported
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {csvHeaders.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.slice(0, 5).map((row, index) => (
                      <TableRow key={index}>
                        {csvHeaders.map((header) => (
                          <TableCell key={header}>{row[header]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {csvData.length > 5 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing 5 of {csvData.length} records
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === "processing" && (
          <div className="space-y-6 py-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Processing Import</h3>
                <p className="text-muted-foreground">
                  Importing {csvData.length} alumni records...
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
                  Alumni data has been successfully imported
                </p>
              </div>
            </div>

            {importResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Import Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Records:</span>
                        <span className="font-medium">{importResults.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Successfully Imported:</span>
                        <span className="font-medium text-green-600">
                          {importResults.imported}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duplicates Skipped:</span>
                        <span className="font-medium text-yellow-600">
                          {importResults.duplicates}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Errors:</span>
                        <span className="font-medium text-red-600">
                          {importResults.errors}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {duplicates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Duplicates Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {duplicates.map((duplicate, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{duplicate.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {duplicate.email}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-yellow-700">
                          {duplicate.reason}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <DialogFooter>
          {step === "upload" && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          )}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button onClick={handleImport}>
                Import {csvData.length} Records
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
