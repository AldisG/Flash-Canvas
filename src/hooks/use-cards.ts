"use client";

import { useState, useEffect } from 'react';

export interface Card {
  id: string;
  word: string;
  meaning: string;
  context: string;
}

const STORAGE_KEY = 'language_learning_cards';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
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
    setIsLoaded(true);
  }, []);

  const saveCards = (newCards: Card[]) => {
    setCards(newCards);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
  };

  const addCard = (card: Omit<Card, 'id'>) => {
    const newCard = { ...card, id: crypto.randomUUID() };
    saveCards([...cards, newCard]);
  };

  const updateCard = (updatedCard: Card) => {
    saveCards(cards.map(c => (c.id === updatedCard.id ? updatedCard : c)));
  };

  const deleteCard = (id: string) => {
    saveCards(cards.filter(c => c.id !== id));
  };

  const deleteMultipleCards = (ids: string[]) => {
    saveCards(cards.filter(c => !ids.includes(c.id)));
  };

  const clearAllCards = () => {
    if (confirm("Are you sure you want to delete all cards? This cannot be undone.")) {
      saveCards([]);
    }
  };

  return { cards, isLoaded, addCard, updateCard, deleteCard, deleteMultipleCards, clearAllCards };
};