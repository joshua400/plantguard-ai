const stats = [
  { value: "50+", label: "Disease Types" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "10K+", label: "Scans Completed" },
  { value: "< 3s", label: "Detection Time" },
];

const StatsSection = () => {
  return (
    <section className="py-16 lg:py-24 gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
