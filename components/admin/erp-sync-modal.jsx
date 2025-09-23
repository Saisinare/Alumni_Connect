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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Database,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Shield,
  Calendar,
  Users,
} from "lucide-react";

export function ERPSyncModal({ open, onOpenChange }) {
  const [step, setStep] = useState("credentials"); // credentials, selection, syncing, complete
  const [credentials, setCredentials] = useState({
    system: "",
    serverUrl: "",
    username: "",
    password: "",
    database: "",
  });
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [progress, setProgress] = useState(0);
  const [syncResults, setSyncResults] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const erpSystems = [
    { value: "sap", label: "SAP ERP" },
    { value: "oracle", label: "Oracle ERP" },
    { value: "microsoft", label: "Microsoft Dynamics" },
    { value: "workday", label: "Workday" },
    { value: "peoplesoft", label: "PeopleSoft" },
    { value: "custom", label: "Custom ERP System" },
  ];

  const availableBatches = [
    { year: "2023", count: 245, department: "All Departments" },
    { year: "2022", count: 298, department: "All Departments" },
    { year: "2021", count: 312, department: "All Departments" },
    { year: "2020", count: 287, department: "All Departments" },
    { year: "2019", count: 301, department: "All Departments" },
  ];

  const departments = [
    { id: "cs", name: "Computer Science", count: 156 },
    { id: "ee", name: "Electrical Engineering", count: 142 },
    { id: "me", name: "Mechanical Engineering", count: 134 },
    { id: "ce", name: "Civil Engineering", count: 98 },
    { id: "bba", name: "Business Administration", count: 87 },
  ];

  const handleCredentialChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTestConnection = async () => {
    setIsConnecting(true);
    setConnectionStatus(null);

    // Simulate connection test
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionStatus("success");
    }, 2000);
  };

  const handleBatchToggle = (batch) => {
    setSelectedBatches((prev) =>
      prev.includes(batch)
        ? prev.filter((b) => b !== batch)
        : [...prev, batch]
    );
  };

  const handleDepartmentToggle = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
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
            total: 456,
            imported: 423,
            duplicates: 28,
            errors: 5,
            batches: selectedBatches.length,
            departments: selectedDepartments.length,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setStep("credentials");
    setCredentials({
      system: "",
      serverUrl: "",
      username: "",
      password: "",
      database: "",
    });
    setSelectedBatches([]);
    setSelectedDepartments([]);
    setProgress(0);
    setSyncResults(null);
    setConnectionStatus(null);
  };

  const totalSelectedRecords = selectedBatches.reduce((total, batch) => {
    const batchData = availableBatches.find((b) => b.year === batch);
    return total + (batchData?.count || 0);
  }, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Database className="w-6 h-6 text-blue-600" />
            Sync from ERP System
            {step !== "credentials" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("credentials")}
                className="ml-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            Connect to your ERP system to fetch alumni data
          </DialogDescription>
        </DialogHeader>

        {step === "credentials" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  ERP Connection Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="erp-system">ERP System</Label>
                  <Select
                    value={credentials.system}
                    onValueChange={(value) => handleCredentialChange("system", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your ERP system" />
                    </SelectTrigger>
                    <SelectContent>
                      {erpSystems.map((system) => (
                        <SelectItem key={system.value} value={system.value}>
                          {system.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="server-url">Server URL</Label>
                  <Input
                    id="server-url"
                    placeholder="https://your-erp-server.com"
                    value={credentials.serverUrl}
                    onChange={(e) => handleCredentialChange("serverUrl", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={(e) => handleCredentialChange("username", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) => handleCredentialChange("password", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    placeholder="alumni_database"
                    value={credentials.database}
                    onChange={(e) => handleCredentialChange("database", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={isConnecting || !credentials.system || !credentials.serverUrl}
                  >
                    {isConnecting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Database className="w-4 h-4 mr-2" />
                    )}
                    Test Connection
                  </Button>
                  {connectionStatus === "success" && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50/50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Security Notice</h4>
                    <p className="text-sm text-blue-700">
                      Your credentials are encrypted and used only for this sync operation. 
                      We recommend using a read-only database user for security.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "selection" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Select Batches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableBatches.map((batch) => (
                    <div
                      key={batch.year}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedBatches.includes(batch.year)}
                          onCheckedChange={() => handleBatchToggle(batch.year)}
                        />
                        <div>
                          <p className="font-medium">Batch {batch.year}</p>
                          <p className="text-sm text-muted-foreground">
                            {batch.count} alumni records
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{batch.count} records</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Select Departments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedDepartments.includes(dept.id)}
                          onCheckedChange={() => handleDepartmentToggle(dept.id)}
                        />
                        <div>
                          <p className="font-medium">{dept.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {dept.count} alumni records
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{dept.count} records</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {(selectedBatches.length > 0 || selectedDepartments.length > 0) && (
              <Card className="bg-purple-50/50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-purple-900">Sync Summary</h4>
                      <p className="text-sm text-purple-700">
                        {selectedBatches.length} batches, {selectedDepartments.length} departments
                      </p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      ~{totalSelectedRecords} records
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Syncing Data</h3>
                <p className="text-muted-foreground">
                  Fetching alumni data from ERP system...
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
                <h3 className="text-lg font-semibold">Sync Complete</h3>
                <p className="text-muted-foreground">
                  Alumni data has been successfully synced from ERP
                </p>
              </div>
            </div>

            {syncResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sync Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Records Found:</span>
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
                      <div className="flex justify-between">
                        <span>Errors:</span>
                        <span className="font-medium text-red-600">
                          {syncResults.errors}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Batches Synced:</span>
                        <span className="font-medium">{syncResults.batches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Departments:</span>
                        <span className="font-medium">{syncResults.departments}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <DialogFooter>
          {step === "credentials" && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep("selection")}
                disabled={connectionStatus !== "success"}
              >
                Continue
              </Button>
            </>
          )}
          {step === "selection" && (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button
                onClick={handleSync}
                disabled={selectedBatches.length === 0 && selectedDepartments.length === 0}
              >
                Sync {totalSelectedRecords} Records
              </Button>
            </>
          )}
          {step === "complete" && (
            <>
              <Button variant="outline" onClick={handleReset}>
                Sync More
              </Button>
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
