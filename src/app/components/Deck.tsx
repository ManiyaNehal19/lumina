"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeckCard from './DeckCard'
import { flashcard, UserData } from '..'

const Deck = ({ userId }: { userId: UserData }) => { 
    const [cards, setCards] = useState<flashcard[]>([]);
    const id = userId.id
    const [no_cardLen, setNoCardLen] = useState(0);

    useEffect(() => {
        const getCard = async () => {
            if (!userId) return;

            try {
                const response = await axios.get("/api/card", { params: { id } });
                const fetchedCards = response.data.message;
                setCards(fetchedCards);
                let total = 0;
                fetchedCards.forEach((deck: flashcard) => {
                    total += deck.content.length;
                });
                setNoCardLen(total);

            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        getCard();
    }, [userId]); 
    return (
        <div className='pl-12 pr-12 mt-6 h-1/2'>
            <div className='text-white flex items-center justify-between'>
                <h2 className='text-4xl text-gray-200 font-bold'>Your Deck</h2>
                <p className='text-gray-300'>
                    {cards.length} decks &bull; {no_cardLen} cards
                </p>
            </div>
            <div className='h-4/5 overflow-scroll w-full mt-4 flex flex-wrap gap-4'>
                {cards.map((card) => (
                    <DeckCard key={card.flashcardID} card={card} />
                ))}
            </div>
        </div>
    )
}

export default Deck;