import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Card {
  id: string;
  word: string;
  meaning: string;
  context: string;
}

const STORAGE_KEY = 'language_learning_cards';
const TOGGLE_MODE_KEY = 'language_learning_toggle_mode';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [toggleMode, setToggleMode] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCards(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cards", e);
      }
    }

    const savedMode = localStorage.getItem(TOGGLE_MODE_KEY);
    if (savedMode !== null) {
      const parsed = parseInt(savedMode, 10);
      if (!isNaN(parsed)) setToggleMode(parsed);
    }

    setIsLoaded(true);
  }, []);

  const saveCards = (newCards: Card[]) => {
    setCards(newCards);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
  };

  const saveToggleMode = (mode: number) => {
    setToggleMode(mode);
    localStorage.setItem(TOGGLE_MODE_KEY, String(mode));
  };

  const addCard = (card: Omit<Card, 'id'>) => {
    const newCard = { ...card, id: crypto.randomUUID() };
    saveCards([...cards, newCard]);
    toast.success('Card added!');
  };

  const updateCard = (updatedCard: Card) => {
    saveCards(cards.map(c => (c.id === updatedCard.id ? updatedCard : c)));
    toast.success('Card updated!');
  };

  const deleteCard = (id: string) => {
    saveCards(cards.filter(c => c.id !== id));
    toast.warning('Card is deleted!');
  };

  const deleteMultipleCards = (ids: string[]) => {
    saveCards(cards.filter(c => !ids.includes(c.id)));
    toast.warning('Selected cards were deleted!');
  };

  const clearAllCards = () => {
    if (confirm("Are you sure you want to delete all cards? This cannot be undone.")) {
      saveCards([]);
      toast.warning('All cards were deleted!');
    }
  };

  return { cards, isLoaded, toggleMode, addCard, updateCard, deleteCard, deleteMultipleCards, clearAllCards, saveToggleMode };
};