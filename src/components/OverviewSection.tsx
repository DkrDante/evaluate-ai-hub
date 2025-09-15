import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  Shield, 
  Zap, 
  FileBarChart, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface OverviewSectionProps {
  onNavigate: (section: string) => void;
}

const OverviewSection = ({ onNavigate }: OverviewSectionProps) => {
  const features = [
    {
      icon: Target,
      title: "Performance Metrics",
      description: "Comprehensive accuracy, precision, recall, and F1 scores with confidence intervals",
      items: ["Per-class metrics", "Macro/micro averages", "Bootstrap CI", "ROC/PR curves"]
    },
    {
      icon: Shield,
      title: "Robustness Testing",
      description: "Evaluate model stability under various corruption and perturbation types",
      items: ["Gaussian noise", "Motion blur", "JPEG compression", "Occlusion attacks"]
    },
    {
      icon: Brain,
      title: "Explainability Analysis", 
      description: "Generate visual explanations and understand model decision-making",
      items: ["Grad-CAM heatmaps", "Integrated gradients", "Attention visualization", "Feature importance"]
    },
    {
      icon: Zap,
      title: "Efficiency Profiling",
      description: "Analyze computational requirements and optimization opportunities",
      items: ["Inference timing", "Memory usage", "Model size", "Parameter count"]
    },
    {
      icon: TrendingUp,
      title: "Statistical Analysis",
      description: "Rigorous statistical testing and baseline comparisons",
      items: ["Significance testing", "Effect size", "Baseline comparison", "Calibration analysis"]
    },
    {
      icon: FileBarChart,
      title: "Automated Reporting",
      description: "Generate publication-ready reports with all visualizations and metrics",
      items: ["Interactive HTML", "Summary export", "Reproducible results", "Professional formatting"]
    }
  ];

  const pipeline_steps = [
    "Environment snapshot & reproducibility",
    "Dataset analysis & stratified splitting", 
    "Model loading & validation",
    "Preprocessing & inference pipeline",
    "Core performance metrics",
    "Advanced visualizations",
    "Bootstrap confidence intervals",
    "Baseline model training",
    "Statistical significance testing",
    "Calibration & uncertainty analysis",
    "Robustness stress testing",
    "Explainability generation",
    "Efficiency profiling",
    "Comprehensive report generation"
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 bg-gradient-subtle rounded-2xl">
        <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-large">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
            ML Model Evaluator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional-grade model evaluation platform providing comprehensive performance analysis, 
            robustness testing, and explainability insights for your machine learning models.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => onNavigate('upload')}
            className="bg-gradient-primary hover:opacity-90 text-white shadow-medium"
          >
            Start Evaluation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => onNavigate('evaluation')}
          >
            View Pipeline
          </Button>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Comprehensive Evaluation Suite</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-standard evaluation pipeline covering all aspects of model assessment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-2 hover:border-accent/50 transition-colors shadow-soft hover:shadow-medium">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">16-Step Evaluation Pipeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Systematic and reproducible evaluation process following best practices
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Pipeline Steps</span>
            </CardTitle>
            <CardDescription>
              Each step is executed in sequence with full provenance tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {pipeline_steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-accent/5 border-accent/20 text-center">
        <CardContent className="py-12 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">Ready to Evaluate Your Model?</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Upload your dataset and pre-trained model to begin comprehensive evaluation in minutes.
            </p>
          </div>
          <Button 
            size="lg"
            onClick={() => onNavigate('upload')}
            className="bg-gradient-primary hover:opacity-90 text-white shadow-medium"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;