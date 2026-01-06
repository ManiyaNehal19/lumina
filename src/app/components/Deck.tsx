"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeckCard from './DeckCard'
import { flashcard, UserData } from '..'
import Link from 'next/link'

const Deck = ({ userId }: { userId: UserData }) => { 
    const [cards, setCards] = useState<flashcard[]>([]);
    const id = userId.id

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

            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        getCard();
    }, [userId]); 
    return (
        <div className='m-5 p-8 '>
            <div className='text-white flex items-center justify-between'>
                <h2 className='text-4xl text-gray-200 font-bold'>Your Recent Deck</h2>
                
                <Link href={`/alldecks/${userId.id}`}  className='text-[#4ade80] underline'>View All</Link>
                
            </div>
            <div className='w-full mt-6 grid grid-cols-4 gap-4'>
                {cards.slice(0, 4).map((card) => (
                    <DeckCard key={card.flashcardID} card={card} />
                ))}
            </div>
        </div>
    )
}

export default Deck;