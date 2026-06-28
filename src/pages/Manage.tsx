import React, { useState } from 'react';
import { useCards, Card as CardModel } from "@/hooks/use-cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit2, Save, X, Trash } from "lucide-react";
import Navigation from '@/components/Navigation';
import ContentWrapper from '@/components/ContentWrapper';

const Manage = () => {
    const { cards, addCard, updateCard, deleteCard, deleteMultipleCards } = useCards();
    const [isAdding, setIsAdding] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchedWord, setsearchedWord] = useState<string>('');

    const [newCard, setNewCard] = useState({ word: '', meaning: '', context: '' });
    const [editCard, setEditCard] = useState<CardModel | null>(null);

    const handleAdd = () => {
        if (newCard.word && newCard.meaning) {
            addCard(newCard);
            setNewCard({ word: '', meaning: '', context: '' });
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

    const handleDeleteSelectedCards = () => {
        deleteMultipleCards(selectedIds); 
        setSelectedIds([]);
    }

    const handleWriteSearchWords = (target: EventTarget & HTMLInputElement) => {
        const value = target.value
        setsearchedWord(value)
    }

    const displayCards: boolean = cards.length !== 0

    return (
        <ContentWrapper>
            <Navigation isBar />

            <div className="flex justify-between items-center w-full mb-4">
                <h1 className="text-3xl font-bold text-primary">Manage Cards</h1>

                <div className="gap-2 flex flex-col content-between sm:flex-row">
                    <Button disabled={!selectedIds.length} variant="destructive" onClick={handleDeleteSelectedCards}>
                        {selectedIds.length ? 'Delete Selected' : '0 Selected'}
                    </Button>

                    <Button variant="outline" onClick={() => setIsAdding(!isAdding)}>
                        <>
                        {isAdding ? <X className="text-xxl" /> : <Plus className="text-xxl" />}
                        <span className='hidden sm:block'>
                            {isAdding ? "Hide Form" : "Show Form"}
                        </span>
                        </>
                    </Button>
                    {/* <Button variant="destructive" onClick={}>
                        <Trash />
                        <span className='hidden ml-2 sm:visible'>
                            Clear All
                        </span>
                    </Button> */}
                </div>
            </div>

            {isAdding && (
                <Card className="w-full bg-slate-300 mb-4">
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
                            <Button variant="secondary" className='text-slate-900 bg-lime-600 hover:bg-lime-500' onClick={handleAdd}>Add Card</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            <div className='mb-6 flex justify-start gap-x-2 w-full md:w-1/3 md:self-start opacity-80'>
                <Input
                    value={searchedWord}
                    onChange={(e) =>handleWriteSearchWords(e.target)}
                    placeholder="Search words..."
                />
            </div>

            <div className="space-y-4 mb-4 w-full">
                {displayCards ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4">
                        {cards.map(card => (
                            <Card 
                                key={card.id} 
                                className={`h-fit ${selectedIds.includes(card.id) ? "bg-red-100" : ""}`}
                            >
                                <CardContent className="p-4 grid grid-cols-[auto_1fr_auto] gap-4">
                                    <Checkbox checked={selectedIds.includes(card.id)} onCheckedChange={() => toggleSelect(card.id)} />
                                    
                                    <div className="flex flex-col lg:flex-row gap-2">
                                        <div className="font-bold text-xl">{card.word}</div>
                                        <div>
                                            <div className="text-sm">{card.meaning}</div>
                                            <div className="text-sm text-muted-foreground italic">{card.context}</div>
                                        </div>
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
                        }
                    </div>
                ) : (
                    <div className="text-center bg-slate-400 p-12 h-auto rounded-md">No cards found. Add your first card above!</div>
                )}
            </div>
        </ContentWrapper>
    );
};

export default Manage;