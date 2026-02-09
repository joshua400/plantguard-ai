import { AlertTriangle, CheckCircle2, Pill, Shield } from "lucide-react";

interface PredictionResultProps {
  result: {
    diseaseName: string;
    confidence: number;
    severity: "Low" | "Medium" | "High";
    treatments: string[];
    preventionTips: string[];
  };
}

const PredictionResult = ({ result }: PredictionResultProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-accent/10 text-accent";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "High":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-accent";
    if (confidence >= 70) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <div className="w-full animate-fade-up">
      {/* Main Result Card */}
      <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
        {/* Header */}
        <div className="gradient-hero p-6 sm:p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-primary-foreground/70 text-sm font-medium mb-1">
                Disease Detected
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {result.diseaseName}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getSeverityColor(
                  result.severity
                )}`}
              >
                {result.severity} Severity
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="p-6 sm:p-8 border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground font-medium">
              Confidence Score
            </span>
            <span
              className={`text-2xl font-bold ${getConfidenceColor(
                result.confidence
              )}`}
            >
              {result.confidence}%
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-hero rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Treatment & Prevention */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {/* Treatments */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">
                Treatment Suggestions
              </h4>
            </div>
            <ul className="space-y-3">
              {result.treatments.map((treatment, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">
                Prevention Tips
              </h4>
            </div>
            <ul className="space-y-3">
              {result.preventionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
