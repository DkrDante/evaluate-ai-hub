import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Eye, TrendingUp, Target, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportSectionProps {
  reportData: any;
  hasReport: boolean;
}

const ReportSection = ({ reportData, hasReport }: ReportSectionProps) => {
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "The comprehensive HTML report has been downloaded.",
    });
  };

  const handleDownloadSummary = () => {
    toast({
      title: "Summary downloaded", 
      description: "The model evaluation summary has been downloaded.",
    });
  };

  const handleViewReport = () => {
    toast({
      title: "Opening report",
      description: "The interactive report will open in a new tab.",
    });
  };

  if (!hasReport) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
          <FileText className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            No Report Available
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Complete the evaluation pipeline to generate your comprehensive model assessment report.
          </p>
        </div>
      </div>
    );
  }

  // Mock comprehensive metrics for demonstration
  const metrics = {
    overall: {
      accuracy: 0.874,
      precision: 0.891,
      recall: 0.862,
      f1Score: 0.876,
    },
    perClass: [
      { class: "Class A", precision: 0.923, recall: 0.895, f1: 0.909, support: 156 },
      { class: "Class B", precision: 0.847, recall: 0.871, f1: 0.859, support: 142 },
      { class: "Class C", precision: 0.903, recall: 0.819, f1: 0.859, support: 128 },
    ],
    robustness: {
      gaussian_noise: 0.742,
      motion_blur: 0.681,
      jpeg_compression: 0.798,
      occlusion: 0.634,
    },
    efficiency: {
      model_size: "47.2 MB",
      parameters: "12.3M",
      inference_time: "23.4 ms",
      memory_usage: "384 MB",
    },
    calibration: {
      brier_score: 0.089,
      ece: 0.034,
      confidence_accuracy: 0.891,
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, variant = "default" }: {
    title: string;
    value: string;
    change?: string;
    icon: any;
    variant?: "default" | "success" | "warning";
  }) => (
    <Card className="border-l-4 border-l-accent">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              variant === "success" ? "bg-success/10" :
              variant === "warning" ? "bg-warning/10" :
              "bg-accent/10"
            }`}>
              <Icon className={`w-4 h-4 ${
                variant === "success" ? "text-success" :
                variant === "warning" ? "text-warning" :
                "text-accent"
              }`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-xl font-bold text-foreground">{value}</p>
            </div>
          </div>
          {change && (
            <Badge variant="outline" className="text-xs">
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Evaluation Report
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis of your model's performance, robustness, and efficiency metrics.
        </p>
      </div>

      {/* Report Actions */}
      <Card className="max-w-2xl mx-auto bg-gradient-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Report Generated</span>
          </CardTitle>
          <CardDescription>
            Your comprehensive model evaluation report is ready for download and review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <Button 
              onClick={handleViewReport}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Report</span>
            </Button>
            <Button 
              onClick={handleDownloadReport}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download HTML</span>
            </Button>
            <Button 
              onClick={handleDownloadSummary}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Summary TXT</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Accuracy"
          value={`${(metrics.overall.accuracy * 100).toFixed(1)}%`}
          change="+2.3%"
          icon={Target}
          variant="success"
        />
        <MetricCard
          title="F1 Score"
          value={`${(metrics.overall.f1Score * 100).toFixed(1)}%`}
          change="+1.8%"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Robustness Score"
          value="71.4%"
          change="-5.2%"
          icon={Shield}
          variant="warning"
        />
        <MetricCard
          title="Inference Time"
          value={metrics.efficiency.inference_time}
          change="Fast"
          icon={Zap}
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Per-Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Per-Class Performance</CardTitle>
            <CardDescription>Detailed metrics for each class in your dataset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.perClass.map((classMetric) => (
                <div key={classMetric.class} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{classMetric.class}</h4>
                    <Badge variant="outline">{classMetric.support} samples</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Precision</p>
                      <p className="font-semibold">{(classMetric.precision * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recall</p>
                      <p className="font-semibold">{(classMetric.recall * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">F1</p>
                      <p className="font-semibold">{(classMetric.f1 * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Robustness Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Robustness Analysis</CardTitle>
            <CardDescription>Performance under various corruption types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(metrics.robustness).map(([corruption, accuracy]) => (
                <div key={corruption} className="flex justify-between items-center">
                  <span className="capitalize text-sm">{corruption.replace('_', ' ')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-accent h-2 rounded-full transition-all"
                        style={{ width: `${(accuracy as number) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">
                      {((accuracy as number) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Model Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Model Efficiency</CardTitle>
            <CardDescription>Resource usage and performance characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Model Size</p>
                <p className="text-lg font-bold">{metrics.efficiency.model_size}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Parameters</p>
                <p className="text-lg font-bold">{metrics.efficiency.parameters}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Inference Time</p>
                <p className="text-lg font-bold">{metrics.efficiency.inference_time}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-lg font-bold">{metrics.efficiency.memory_usage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calibration Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Model Calibration</CardTitle>
            <CardDescription>Confidence and uncertainty analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Brier Score</span>
                <Badge variant="outline">{metrics.calibration.brier_score.toFixed(3)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Expected Calibration Error</span>
                <Badge variant="outline">{metrics.calibration.ece.toFixed(3)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Confidence-Accuracy</span>
                <Badge variant="outline">{(metrics.calibration.confidence_accuracy * 100).toFixed(1)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportSection;