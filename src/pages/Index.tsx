import { useState } from "react";
import Navigation from "@/components/Navigation";
import OverviewSection from "@/components/OverviewSection";
import UploadSection from "@/components/UploadSection";
import EvaluationSection from "@/components/EvaluationSection";
import ReportSection from "@/components/ReportSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [reportData, setReportData] = useState(null);

  const handleEvaluationStart = (jobId: string) => {
    setActiveJobId(jobId);
    setActiveSection("evaluation");
  };

  const handleEvaluationComplete = (data: any) => {
    setReportData(data);
    setActiveSection("report");
  };

  const hasReport = reportData !== null;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onNavigate={setActiveSection} />;
      case "upload":
        return <UploadSection onEvaluationStart={handleEvaluationStart} />;
      case "evaluation":
        return (
          <EvaluationSection 
            activeJobId={activeJobId}
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
