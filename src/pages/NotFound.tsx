import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Leaf } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-8 animate-float">
          <Leaf className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-6xl sm:text-8xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page seems to have wilted away.
        </p>
        <Link to="/">
          <Button size="lg">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
