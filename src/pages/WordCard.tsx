import { Card } from '@/hooks/use-cards';
import React, { useEffect, useState } from 'react';

interface Props {
    card: Card;
    showMeaning: boolean;
    showMeaningFirst: boolean;
}

const ANIMATION_DURATION = 100;

const WordCard: React.FC<Props> = ({ card, showMeaning, showMeaningFirst }) => {
    const [hidden, setHidden] = useState(!showMeaning);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (showMeaning) {
            setHidden(false);
        } else {
            timer = setTimeout(() => {
                setHidden(true);
            }, ANIMATION_DURATION);
        }

        return () => clearTimeout(timer);
    }, [showMeaning]);

    const wordMeaningWrapperClasses = `text-center
        w-full h-auto p-12 rounded-xl
        md:h-[calc(70vh-4rem)]
        touch-none cursor-crosshair
        flex flex-col
        justify-center gap-4
        overflow-auto
        bg-white`

    const handleMeaningAnimation = `
        duration-${ANIMATION_DURATION}
        ${hidden ? 'hidden pointer-events-none' : ''}
        ${showMeaning
        ? 'animate-in fade-in slide-in-from-top-2'
        : 'animate-out fade-out slide-in-from-bottom-2'
    }`

    return (
        <div className={wordMeaningWrapperClasses}>
            {card && (
                <>
                    <div className="text-4xl font-bold content-center">{showMeaningFirst ? card.meaning : card.word}</div>

                    <div className={`w-full flex flex-col justify-center ${handleMeaningAnimation}`}>
                        <div className="text-2xl text-primary font-medium">
                            {showMeaningFirst ? card.word : card.meaning }
                        </div>

                        {card.context && (
                            <div className="text-xl font-medium text-slate-600">
                                {card.context}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default WordCard;