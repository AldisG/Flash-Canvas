import React, { useState } from 'react';
import { useCards, Card as CardModel } from "@/hooks/use-cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit2, Save, X, Trash } from "lucide-react";
import Navigation from '@/components/Navigation';

const Manage = () => {
  const { cards, addCard, updateCard, deleteCard, deleteMultipleCards, clearAllCards } = useCards();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [newCard, setNewCard] = useState({ word: '', meaning: '', context: '' });
  const [editCard, setEditCard] = useState<CardModel | null>(null);

  const handleAdd = () => {
    if (newCard.word && newCard.meaning) {
      addCard(newCard);
      setNewCard({ word: '', meaning: '', context: '' });
      setIsAdding(false);
    }
  };

  const handleEditStart = (card: CardModel) => {
    setEditCard(card);
    setIsEditing(card.id);
  };

  const handleEditSave = () => {
    if (editCard) {
      updateCard(editCard);
      setIsEditing(null);
      setEditCard(null);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen space-y-8">
      <Navigation isBar />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Manage Cards</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? <X className="mr-2" /> : <Plus className="mr-2" />}
            {isAdding ? "Cancel" : "Add Card"}
          </Button>
          <Button variant="destructive" onClick={clearAllCards}>
            <Trash className="mr-2" /> Clear All
          </Button>
        </div>
      </div>

      {isAdding && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>New Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Word</Label>
                <Input
                  value={newCard.word}
                  onChange={e => setNewCard({ ...newCard, word: e.target.value })}
                  placeholder="e.g. Bonjour"
                />
              </div>
              <div className="space-y-2">
                <Label>Meaning</Label>
                <Input
                  value={newCard.meaning}
                  onChange={e => setNewCard({ ...newCard, meaning: e.target.value })}
                  placeholder="e.g. Hello"
                />
              </div>
              <div className="space-y-2">
                <Label>Context</Label>
                <Input
                  value={newCard.context}
                  onChange={e => setNewCard({ ...newCard, context: e.target.value })}
                  placeholder="e.g. Bonjour, comment ça va?"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Add Card</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedIds.length > 0 && (
        <div className="flex justify-center">
          <Button variant="destructive" onClick={() => { deleteMultipleCards(selectedIds); setSelectedIds([]); }}>
            Delete Selected ({selectedIds.length})
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {cards.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No cards found. Add your first card above!</div>
        ) : (
          cards.map(card => (
            <Card key={card.id} className={selectedIds.includes(card.id) ? "border-primary bg-primary/5" : ""}>
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox checked={selectedIds.includes(card.id)} onCheckedChange={() => toggleSelect(card.id)} />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="font-bold text-lg">{card.word}</div>
                    <div className="text-sm text-muted-foreground">{card.meaning}</div>
                  </div>
                  <div className="md:col-span-2 text-sm text-muted-foreground italic">{card.context}</div>
                </div>
                <div className="flex gap-2">
                  {isEditing === card.id ? (
                    <>
                      <Button size="icon" variant="outline" onClick={handleEditSave}>
                        <Save className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => setIsEditing(null)}>
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="icon" variant="ghost" onClick={() => handleEditStart(card)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteCard(card.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>

              {isEditing === card.id && (
                <div className="px-4 pb-4 space-y-3 border-t pt-4">
                  <Input
                    value={editCard?.word}
                    onChange={e => setEditCard(prev => prev ? { ...prev, word: e.target.value } : null)}
                    placeholder="Word"
                  />
                  <Input
                    value={editCard?.meaning}
                    onChange={e => setEditCard(prev => prev ? { ...prev, meaning: e.target.value } : null)}
                    placeholder="Meaning"
                  />
                  <Input
                    value={editCard?.context}
                    onChange={e => setEditCard(prev => prev ? { ...prev, context: e.target.value } : null)}
                    placeholder="Context"
                  />
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Manage;