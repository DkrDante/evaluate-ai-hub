import { useState } from "react";
import Navigation from "@/components/Navigation";
import OverviewSection from "@/components/OverviewSection";
import UploadSection from "@/components/UploadSection";
import EvaluationSection from "@/components/EvaluationSection";
import ReportSection from "@/components/ReportSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [uploadedFiles, setUploadedFiles] = useState<{dataset: any, model: any}>({
    dataset: null,
    model: null
  });
  const [reportData, setReportData] = useState(null);

  const handleFilesUploaded = (dataset: any, model: any) => {
    setUploadedFiles({ dataset, model });
  };

  const handleEvaluationComplete = (data: any) => {
    setReportData(data);
    setActiveSection("report");
  };

  const canRunEvaluation = uploadedFiles.dataset && uploadedFiles.model;
  const hasReport = reportData !== null;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onNavigate={setActiveSection} />;
      case "upload":
        return <UploadSection onFilesUploaded={handleFilesUploaded} />;
      case "evaluation":
        return (
          <EvaluationSection 
            canRun={canRunEvaluation} 
            onEvaluationComplete={handleEvaluationComplete}
          />
        );
      case "report":
        return <ReportSection reportData={reportData} hasReport={hasReport} />;
      default:
        return <OverviewSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
