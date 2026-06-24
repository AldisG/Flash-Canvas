import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCards, Card as CardType } from "@/hooks/use-cards";
import PracticeCanvas from "@/components/PracticeCanvas";
import { RefreshCw, Shuffle, Eye, EyeOff, LucideEye, ScanEye, BookA, Book } from "lucide-react";
import Navigation from '@/components/Navigation';
import ContentWrapper from '@/components/ContentWrapper';
import NoCardsFound from './NoCardsFound';
import WordCard from './WordCard';

const Practice = () => {
    const { cards, isLoaded } = useCards();
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [showMeaning, setShowMeaning] = useState(false);
    const [deck, setDeck] = useState<number[]>([]);
    const [showMeaningFirst, setshowMeaningFirst] = useState(false);

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

    const toggleShowMeaningFirst = () => {
        setshowMeaningFirst(!showMeaningFirst)
    }

    const currentCard = deck[currentIndex] !== undefined ? cards[deck[currentIndex]] : null;

    if (!isLoaded) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <ContentWrapper>
            <Navigation isBar />

            <div className="flex justify-between items-center mb-4 md:mb-8 gap-x-2">
                <h1 className="text-3xl font-bold text-white">Practice</h1>
                <div className="text-sm text-slate-300 mt-2">
                    {cards.length > 0 ? `${currentIndex + 1} / ${cards.length}` : 'No cards available'}
                </div>
            </div>

            {cards.length === 0 ?
                (<NoCardsFound />)
                :
                (<div className="grid md:grid-cols-2 gap-6 w-full">
                    <WordCard card={currentCard} showMeaning={showMeaning} showMeaningFirst={showMeaningFirst} />

                    <div className='grid gap-y-4'>
                        <PracticeCanvas nextCard={nextCard} shuffleDeck={shuffleDeck}>
                            <>
                                <Button className='w-1/5'
                                    variant='outline'
                                    title={showMeaningFirst ? 'Show Meaning' : 'Show Word'}
                                    aria-label='Switch Places Meaning and Word'
                                    onClick={toggleShowMeaningFirst}
                                    size='sm'>
                                    {showMeaningFirst ? (
                                        <Book />
                                    ) : (
                                        <BookA />
                                    )}
                                </Button>
                                <Button className='w-1/5' title={showMeaning ? "Hide Meaning" : "Show Meaning"} variant="secondary" size='sm' onClick={() => setShowMeaning(!showMeaning)}>
                                    {showMeaning ? <EyeOff /> : <Eye />}
                                </Button>
                            </>
                        </PracticeCanvas>
                    </div>
                </div>
            )}
        </ContentWrapper>
    );
};

export default Practice;