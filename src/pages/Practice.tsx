import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCards, Card as CardType } from "@/hooks/use-cards";
import PracticeCanvas from "@/components/PracticeCanvas";
import { RefreshCw, Shuffle, Eye, EyeOff } from "lucide-react";
import Navigation from '@/components/Navigation';

const Practice = () => {
  const { cards, isLoaded } = useCards();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [showMeaning, setShowMeaning] = useState(false);
  const [deck, setDeck] = useState<number[]>([]);

  useEffect(() => {
    if (isLoaded && cards.length > 0) {
      const initialDeck = [...cards.keys()];
      setDeck(initialDeck);
      setCurrentIndex(0);
    }
  }, [isLoaded, cards]);

  const nextCard = () => {
    if (deck.length === 0) return;
    let nextIdx = currentIndex + 1;
    if (nextIdx >= deck.length) {
      const newDeck = [...cards.keys()].sort(() => Math.random() - 0.5);
      setDeck(newDeck);
      nextIdx = 0;
    }
    setCurrentIndex(nextIdx);
    setShowMeaning(false);
  };

  const shuffleDeck = () => {
    const newDeck = [...cards.keys()].sort(() => Math.random() - 0.5);
    setDeck(newDeck);
    setCurrentIndex(0);
    setShowMeaning(false);
  };



  const currentCard = deck[currentIndex] !== undefined ? cards[deck[currentIndex]] : null;

  if (!isLoaded) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col">
      <Navigation isBar />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Practice</h1>
        <div className="text-sm text-muted-foreground">
          {cards.length > 0 ? `${currentIndex + 1} / ${cards.length}` : 'No cards available'}
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <RefreshCw className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-xl font-medium">No cards to practice!</p>
          <p className="text-muted-foreground">Go to Manage to add some new cards.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-6">
          <Card className="shadow-xl border-2 transition-all duration-300">
            <CardContent className="p-12 flex flex-col items-center justify-center min-h-[300px] text-center">
              {currentCard && (
                <>
                  <div className="text-4xl font-bold mb-6">{currentCard.word}</div>
                  {showMeaning && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="text-2xl text-primary font-medium">{currentCard.meaning}</div>
                      {currentCard.context && (
                        <div className="text-muted-foreground italic px-4">"{currentCard.context}"</div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 text-lg" onClick={() => setShowMeaning(!showMeaning)}>
              {showMeaning ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
              {showMeaning ? "Hide Meaning" : "Show Meaning"}
            </Button>

            <Button variant="outline" className="h-12 text-lg" onClick={shuffleDeck}>
              <Shuffle className="mr-2" /> Random
            </Button>
          </div>

          <div className="space-y-4">
            <PracticeCanvas />
          </div>

          <div className="pt-4">
            <Button className="w-full h-14 text-xl font-bold" onClick={nextCard}>
              Next Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;