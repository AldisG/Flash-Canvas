import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="text-center space-y-8 max-w-md w-full px-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">LingoFlow</h1>
          <p className="text-xl text-muted-foreground">Simple, effective, offline-first learning.</p>
        </div>

        <Navigation />
      </div>
    </div>
  );
};

export default Index;