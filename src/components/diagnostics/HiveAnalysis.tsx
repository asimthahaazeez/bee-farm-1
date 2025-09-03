import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Camera, 
  FileImage, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Download
} from "lucide-react";

interface AnalysisResult {
  id: string;
  imageUrl: string;
  healthScore: number;
  populationEstimate: number;
  issuesDetected: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    confidence: number;
    coordinates: { x: number; y: number; width: number; height: number };
    description: string;
  }>;
  analysisDate: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  estimatedCompletion?: string;
}

interface HiveAnalysisProps {
  hiveId: string;
  hiveName: string;
  analysisHistory: AnalysisResult[];
}

const HiveAnalysis = ({ hiveId, hiveName, analysisHistory = [] }: HiveAnalysisProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    // Simulate analysis process
    const mockAnalysis: AnalysisResult = {
      id: Date.now().toString(),
      imageUrl: URL.createObjectURL(selectedFile),
      healthScore: 0,
      populationEstimate: 0,
      issuesDetected: [],
      analysisDate: new Date().toISOString(),
      status: 'processing',
      progress: 0,
      estimatedCompletion: new Date(Date.now() + 120000).toLocaleTimeString()
    };
    
    setCurrentAnalysis(mockAnalysis);
    
    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete the analysis with results
        const completedAnalysis: AnalysisResult = {
          ...mockAnalysis,
          status: 'completed',
          progress: 100,
          healthScore: Math.floor(Math.random() * 30 + 70),
          populationEstimate: Math.floor(Math.random() * 15000 + 30000),
          issuesDetected: [
            {
              type: 'Varroa Mites',
              severity: 'medium',
              confidence: 0.85,
              coordinates: { x: 150, y: 200, width: 80, height: 60 },
              description: 'Detected possible varroa mite presence in cell area'
            },
            {
              type: 'Queen Cells',
              severity: 'low',
              confidence: 0.72,
              coordinates: { x: 300, y: 150, width: 40, height: 50 },
              description: 'Supersedure queen cells detected'
            }
          ]
        };
        setCurrentAnalysis(completedAnalysis);
        setIsUploading(false);
      } else {
        setCurrentAnalysis(prev => prev ? { ...prev, progress } : null);
      }
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-amber text-amber-dark';
      case 'low': return 'bg-sage text-sage-dark';
      default: return 'bg-muted';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-sage';
    if (score >= 60) return 'text-amber';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Analyze Hive Comb - {hiveName}
            </h3>
            <p className="text-muted-foreground">
              Upload a photo of your hive comb for AI-powered health analysis
            </p>
          </div>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-honey/20 rounded-full">
                  <FileImage className="w-8 h-8 text-honey-dark" />
                </div>
              </div>
              <div>
                <p className="text-foreground font-medium mb-2">
                  Drop your comb photo here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG up to 10MB. Best results with clear, well-lit photos.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-honey text-honey-dark hover:bg-honey hover:text-dark-brown"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <FileImage className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <Badge variant="secondary">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</Badge>
              </div>
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                className="bg-sage text-white hover:bg-sage-dark"
              >
                {isUploading ? "Analyzing..." : "Start Analysis"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Current Analysis Progress */}
      {currentAnalysis && currentAnalysis.status === 'processing' && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin p-2 bg-honey/20 rounded-full">
                <Clock className="w-5 h-5 text-honey-dark" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Analysis in Progress</h4>
                <p className="text-sm text-muted-foreground">
                  Estimated completion: {currentAnalysis.estimatedCompletion}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing comb image...</span>
                <span>{Math.round(currentAnalysis.progress)}%</span>
              </div>
              <Progress value={currentAnalysis.progress} className="h-3" />
            </div>
          </div>
        </Card>
      )}

      {/* Analysis Results */}
      {currentAnalysis && currentAnalysis.status === 'completed' && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-sage" />
              <h4 className="text-xl font-semibold text-foreground">Analysis Complete</h4>
            </div>
            
            {/* Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className={`text-3xl font-bold mb-2 ${getHealthScoreColor(currentAnalysis.healthScore)}`}>
                  {currentAnalysis.healthScore}%
                </div>
                <div className="text-sm text-muted-foreground">Health Score</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-honey-dark mb-2">
                  {(currentAnalysis.populationEstimate / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-muted-foreground">Est. Population</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-amber-dark mb-2">
                  {currentAnalysis.issuesDetected.length}
                </div>
                <div className="text-sm text-muted-foreground">Issues Found</div>
              </Card>
            </div>

            {/* Issues Detected */}
            {currentAnalysis.issuesDetected.length > 0 && (
              <div className="space-y-3">
                <h5 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Issues Detected
                </h5>
                <div className="space-y-2">
                  {currentAnalysis.issuesDetected.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{issue.type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {issue.description} (Confidence: {Math.round(issue.confidence * 100)}%)
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View on Image
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="bg-sage text-white hover:bg-sage-dark">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" onClick={() => setSelectedAnalysis(currentAnalysis)}>
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Results
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis History */}
      <Card className="p-6">
        <h4 className="text-xl font-semibold text-foreground mb-4">Analysis History</h4>
        <div className="space-y-3">
          {analysisHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileImage className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No previous analyses found</p>
              <p className="text-sm">Upload your first comb photo to get started</p>
            </div>
          ) : (
            analysisHistory.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-xl">
                <div className="flex items-center gap-4">
                  <img 
                    src={analysis.imageUrl} 
                    alt="Comb analysis" 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {new Date(analysis.analysisDate).toLocaleDateString()}
                      </span>
                      <Badge className={getSeverityColor(analysis.issuesDetected.length > 0 ? 'medium' : 'low')}>
                        {analysis.issuesDetected.length} Issues
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Health: <span className={getHealthScoreColor(analysis.healthScore)}>
                        {analysis.healthScore}%
                      </span> | 
                      Population: {(analysis.populationEstimate / 1000).toFixed(0)}K bees
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedAnalysis(analysis)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default HiveAnalysis;