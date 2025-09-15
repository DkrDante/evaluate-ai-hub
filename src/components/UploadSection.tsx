import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Database, Brain, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  uploaded: boolean;
}

interface UploadSectionProps {
  onFilesUploaded: (dataset: UploadedFile | null, model: UploadedFile | null) => void;
}

const UploadSection = ({ onFilesUploaded }: UploadSectionProps) => {
  const [datasetFile, setDatasetFile] = useState<UploadedFile | null>(null);
  const [modelFile, setModelFile] = useState<UploadedFile | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: 'dataset' | 'model') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadedFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploaded: true,
    };

    if (type === 'dataset') {
      setDatasetFile(uploadedFile);
      toast({
        title: "Dataset uploaded",
        description: `Successfully uploaded ${file.name}`,
      });
    } else {
      setModelFile(uploadedFile);
      toast({
        title: "Model uploaded", 
        description: `Successfully uploaded ${file.name}`,
      });
    }

    // Notify parent component
    if (type === 'dataset') {
      onFilesUploaded(uploadedFile, modelFile);
    } else {
      onFilesUploaded(datasetFile, uploadedFile);
    }
  }, [datasetFile, modelFile, onFilesUploaded, toast]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileUploadCard = ({ 
    type, 
    icon: Icon, 
    title, 
    description, 
    acceptedFormats,
    file,
    onUpload 
  }: {
    type: 'dataset' | 'model';
    icon: any;
    title: string;
    description: string;
    acceptedFormats: string;
    file: UploadedFile | null;
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <Card className="border-2 border-dashed border-border hover:border-accent transition-colors">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {file ? (
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-full h-32 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Drag & drop or click to select</p>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <input
            type="file"
            id={`${type}-upload`}
            className="hidden"
            accept={acceptedFormats}
            onChange={onUpload}
          />
          <Button
            variant={file ? "outline" : "secondary"}
            className="w-full"
            onClick={() => document.getElementById(`${type}-upload`)?.click()}
          >
            {file ? "Replace File" : "Select File"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Accepted: {acceptedFormats}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Upload Your Files
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your dataset and pre-trained Keras model to begin the comprehensive evaluation pipeline.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <FileUploadCard
          type="dataset"
          icon={Database}
          title="Dataset Upload"
          description="Structured dataset with class folders"
          acceptedFormats=".zip,.tar,.tar.gz"
          file={datasetFile}
          onUpload={(e) => handleFileUpload(e, 'dataset')}
        />

        <FileUploadCard
          type="model"
          icon={Brain}
          title="Model Upload"
          description="Pre-trained Keras model file"
          acceptedFormats=".h5,.keras"
          file={modelFile}
          onUpload={(e) => handleFileUpload(e, 'model')}
        />
      </div>

      {datasetFile && modelFile && (
        <Card className="max-w-2xl mx-auto bg-gradient-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-success" />
              <div>
                <h3 className="font-semibold text-foreground">Ready for Evaluation</h3>
                <p className="text-sm text-muted-foreground">
                  Both files uploaded successfully. You can now proceed to run the evaluation pipeline.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadSection;