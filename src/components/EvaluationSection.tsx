import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, CheckCircle, Clock, AlertTriangle, TrendingUp, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEvaluationJobs } from "@/hooks/useEvaluationJobs";

interface EvaluationStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
  duration?: number;
}

interface EvaluationSectionProps {
  activeJobId: string | null;
  onEvaluationComplete: (reportData: any) => void;
}

const EvaluationSection = ({ activeJobId, onEvaluationComplete }: EvaluationSectionProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { jobs, loading, updateJobStatus, deleteJob } = useEvaluationJobs();
  
  // Find the active job or get the most recent job
  const activeJob = activeJobId ? jobs.find(job => job.id === activeJobId) : jobs[0];
  const canRun = activeJob?.status === 'pending';

  const evaluationSteps: EvaluationStep[] = [
    { id: "env", title: "Environment Snapshot", description: "Recording Python version, libraries, and random seed", status: "pending" },
    { id: "dataset", title: "Dataset Analysis", description: "Summarizing class names and image counts", status: "pending" },
    { id: "split", title: "Train/Test Split", description: "Creating stratified split with recorded ratio", status: "pending" },
    { id: "model", title: "Model Loading", description: "Loading and validating pre-trained Keras model", status: "pending" },
    { id: "preprocess", title: "Data Preprocessing", description: "Resizing and normalizing images", status: "pending" },
    { id: "inference", title: "Model Inference", description: "Running predictions on test set", status: "pending" },
    { id: "metrics", title: "Performance Metrics", description: "Computing accuracy, precision, recall, F1 scores", status: "pending" },
    { id: "visualization", title: "Visualizations", description: "Generating confusion matrix and ROC curves", status: "pending" },
    { id: "bootstrap", title: "Bootstrap Analysis", description: "Computing 95% confidence intervals", status: "pending" },
    { id: "baseline", title: "Baseline Comparison", description: "Training simple baseline model", status: "pending" },
    { id: "statistical", title: "Statistical Testing", description: "Performing significance tests vs baseline", status: "pending" },
    { id: "calibration", title: "Model Calibration", description: "Analyzing calibration and uncertainty", status: "pending" },
    { id: "robustness", title: "Robustness Testing", description: "Testing against noise, blur, compression", status: "pending" },
    { id: "explainability", title: "Explainability Analysis", description: "Generating Grad-CAM and attention maps", status: "pending" },
    { id: "efficiency", title: "Efficiency Metrics", description: "Measuring inference time and memory usage", status: "pending" },
    { id: "report", title: "Report Generation", description: "Compiling comprehensive HTML report", status: "pending" },
  ];

  const [steps, setSteps] = useState(evaluationSteps);

  const runEvaluation = async () => {
    if (!canRun || !activeJob) {
      toast({
        title: "Cannot start evaluation",
        description: "Please select a valid evaluation job first.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setCurrentStep(0);
    
    // Update job status to running
    await updateJobStatus(activeJob.id, 'running');
    
    try {
      // Simulate evaluation pipeline
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        setProgress((i / steps.length) * 100);
        
        // Update step status to running
        setSteps(prevSteps => 
          prevSteps.map((step, index) => 
            index === i 
              ? { ...step, status: "running" as const }
              : step
          )
        );

        // Simulate processing time
        const processingTime = [500, 800, 600, 1000, 1200, 2000, 800, 1500, 1000, 2500, 800, 1200, 1800, 2200, 600, 1000][i];
        await new Promise(resolve => setTimeout(resolve, processingTime));

        // Update step status to completed
        setSteps(prevSteps => 
          prevSteps.map((step, index) => 
            index === i 
              ? { ...step, status: "completed" as const, duration: processingTime }
              : step
          )
        );
      }

      setProgress(100);
      
      // Generate mock results
      const mockResults = {
        accuracy: 0.874,
        precision: 0.891,
        recall: 0.862,
        f1Score: 0.876,
        completedAt: new Date().toISOString(),
      };
      
      const mockReportHtml = `<html><body><h1>Evaluation Report</h1><p>Accuracy: ${mockResults.accuracy}</p></body></html>`;
      const mockSummary = `Model achieved ${(mockResults.accuracy * 100).toFixed(1)}% accuracy with strong precision and recall scores.`;
      
      // Update job with results
      await updateJobStatus(activeJob.id, 'completed', mockResults, mockReportHtml, mockSummary);
      
      onEvaluationComplete(mockResults);
      
      toast({
        title: "Evaluation completed!",
        description: "Your comprehensive model evaluation report is ready.",
      });
    } catch (error) {
      await updateJobStatus(activeJob.id, 'failed', null, null, null, 'Evaluation pipeline failed');
      toast({
        title: "Evaluation failed",
        description: "An error occurred during the evaluation process.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Clock className="w-4 h-4 text-warning animate-spin" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-muted" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge variant="outline" className="text-warning border-warning">Running</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-success border-success">Completed</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Model Evaluation Pipeline
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Run the comprehensive 16-step evaluation pipeline to analyze your model's performance, robustness, and explainability.
        </p>
      </div>

      {/* Control Panel */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Evaluation Controls</span>
          </CardTitle>
          <CardDescription>
            Initiate the full evaluation pipeline for comprehensive model analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
              </p>
            </div>
          )}
          
          <Button
            onClick={runEvaluation}
            disabled={!canRun || isRunning}
            size="lg"
            className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-medium"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            {isRunning ? "Running Evaluation..." : "Start Evaluation Pipeline"}
          </Button>
          
          {!canRun && (
            <p className="text-sm text-muted-foreground text-center">
              Upload both dataset and model files to enable evaluation
            </p>
          )}
        </CardContent>
      </Card>

      {/* Pipeline Steps */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Pipeline Steps</h3>
        <div className="grid gap-4">
          {steps.map((step, index) => (
            <Card 
              key={step.id} 
              className={`transition-all ${
                index === currentStep ? "ring-2 ring-accent shadow-medium" : ""
              } ${step.status === "completed" ? "bg-success/5 border-success/20" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStepIcon(step.status)}
                    <div>
                      <h4 className="font-medium text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {step.duration && (
                      <Badge variant="outline" className="text-xs">
                        {(step.duration / 1000).toFixed(1)}s
                      </Badge>
                    )}
                    {getStatusBadge(step.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationSection;