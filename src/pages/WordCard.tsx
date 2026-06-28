import { Card } from '@/hooks/use-cards';
import React, { useEffect, useState } from 'react';

interface Props {
    card: Card;
    showMeaning: boolean;
    showMeaningFirst: number;
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
        touch-none
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

    const handleMeaningDisplayLogic = () => {
        switch  (showMeaningFirst) {
            case 0:
                return {
                        first: card?.word ?? '',
                        second: card?.meaning ?? '',
                        third: card?.context ?? '',
                    }
            case 1:
                return {
                        second: card?.word ?? '',
                        first: card?.meaning ?? '',
                        third: card?.context ?? '',
                    }
            case 2:
                return {
                        third: card?.word ?? '',
                        first: card?.meaning ?? '',
                        second: card?.context ?? '',
                    }
            default:
                return {
                        first: card?.word ?? '',
                        second: card?.meaning ?? '',
                        third: card?.context ?? '',
                    }
        }
    }

    const {first, second, third} = handleMeaningDisplayLogic()

    return (
        <div className={wordMeaningWrapperClasses}>
            {card && (
                <>
                    <div className="text-4xl md:text-6xl font-bold content-center">{first}</div>

                    <div className={`w-full flex flex-col justify-center ${handleMeaningAnimation}`}>
                        <div className="text-2xl md:text-4xl text-primary font-medium">
                            { second }
                        </div>

                        {third && (
                            <div className="text-lg mt-4 md:text-xl font-medium text-slate-600">
                                {third}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default WordCard;