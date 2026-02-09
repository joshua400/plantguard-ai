import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ImageIcon, 
  Cpu, 
  Brain, 
  FileCheck, 
  Network,
  Layers,
  Microscope,
  RefreshCw
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Image Preprocessing",
    description: "The uploaded image is resized, normalized, and enhanced to ensure optimal input quality for the neural network.",
    icon: ImageIcon,
  },
  {
    step: "02",
    title: "Feature Extraction",
    description: "Our CNN model extracts key visual features like leaf patterns, color variations, and lesion characteristics.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Model Prediction",
    description: "The extracted features are processed through our trained deep learning model to identify potential diseases.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Result Interpretation",
    description: "The prediction is analyzed to provide disease name, confidence score, and actionable treatment recommendations.",
    icon: FileCheck,
  },
];

const technologies = [
  {
    name: "CNN",
    fullName: "Convolutional Neural Networks",
    description: "Deep learning architecture optimized for image pattern recognition",
    icon: Network,
  },
  {
    name: "Image Classification",
    fullName: "Multi-class Classification",
    description: "Accurate categorization of plant diseases from visual symptoms",
    icon: ImageIcon,
  },
  {
    name: "Deep Learning",
    fullName: "Neural Network Processing",
    description: "Multi-layer networks that learn complex patterns automatically",
    icon: Brain,
  },
  {
    name: "Transfer Learning",
    fullName: "Pre-trained Models",
    description: "Leveraging models trained on millions of images for better accuracy",
    icon: RefreshCw,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
                About Our Technology
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                How Plant Disease Detection Works
              </h1>
              <p className="text-lg text-muted-foreground">
                Our AI-powered system uses cutting-edge deep learning techniques to analyze 
                plant images and detect diseases with high accuracy. Learn about the science behind our technology.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                The Detection Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From image upload to actionable results in just seconds
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="bg-card rounded-2xl border border-border/50 shadow-card p-6 lg:p-8 h-full hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="text-5xl font-bold text-primary/10 mb-4">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Technologies */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Core Technologies
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built on state-of-the-art machine learning technologies
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl border border-border/50 shadow-card p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <tech.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {tech.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
                <div className="gradient-hero p-8 lg:p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
                    <Microscope className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
                    Research-Backed Accuracy
                  </h3>
                  <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                    Our model is trained on a comprehensive dataset of over 50,000 images 
                    covering 50+ common plant diseases. We continuously improve our accuracy 
                    through ongoing research and data collection.
                  </p>
                </div>
                <div className="grid grid-cols-3 divide-x divide-border">
                  <div className="p-6 text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">50K+</div>
                    <div className="text-sm text-muted-foreground">Training Images</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">95%+</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                    <div className="text-sm text-muted-foreground">Disease Types</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
