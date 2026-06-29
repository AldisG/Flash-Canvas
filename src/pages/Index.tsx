import ContentWrapper from "@/components/ContentWrapper";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <ContentWrapper>
      <div className="text-center space-y-8 max-w-md w-full py-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">Flash Cards Canvas</h1>
          <p className="text-xl text-slate-300">Practice your wrods.</p>
        </div>

        <Navigation />

        <div className="grid gap-x4 text-slate-300">
          Write your cards, their meaning, practice writing and remembering them!
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Index;