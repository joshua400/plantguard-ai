import { Scan, Brain, FileCheck, Clock, Leaf, Shield } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Image Analysis",
    description: "Upload any plant image and our AI will analyze it for potential diseases.",
  },
  {
    icon: Brain,
    title: "Deep Learning",
    description: "Powered by state-of-the-art CNN models trained on millions of plant images.",
  },
  {
    icon: FileCheck,
    title: "Detailed Reports",
    description: "Get comprehensive reports with disease identification and treatment plans.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Receive accurate diagnosis within seconds of uploading your image.",
  },
  {
    icon: Leaf,
    title: "50+ Plant Species",
    description: "Support for a wide variety of crops, fruits, vegetables, and ornamental plants.",
  },
  {
    icon: Shield,
    title: "Prevention Tips",
    description: "Learn how to prevent future infections and maintain plant health.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for Plant Health
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform provides comprehensive tools for detecting, diagnosing, and treating plant diseases.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
