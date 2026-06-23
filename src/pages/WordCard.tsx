import { Card } from '@/hooks/use-cards';
import React, { useEffect, useState } from 'react';

interface Props {
    card: Card;
    showMeaning: boolean;
}

const ANIMATION_DURATION = 100;

const WordCard: React.FC<Props> = ({ card, showMeaning }) => {
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

    const handleMeaningAnimation = `flex justify-evenly gap-x-4 items-end flex-wrap w-full content-center
              duration-${ANIMATION_DURATION}
              ${hidden ? 'hidden pointer-events-none' : ''}
              ${showMeaning
            ? 'animate-in fade-in slide-in-from-top-2'
            : 'animate-out fade-out slide-in-from-bottom-2'
        }`

    return (
        <div className="grid sm:grid-cols-2 justify-evenly gap-x-4 p-12 rounded-xl overflow-hidden bg-white">
            {card && (
                <>
                    <div className="text-4xl font-bold">{card.word}</div>

                    <div className={handleMeaningAnimation}>
                        <div className="text-2xl text-primary font-medium">
                            {card.meaning}
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