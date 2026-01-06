"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeckCard from './DeckCard'
import { flashcard, UserData } from '..'
import Link from 'next/link'

const Deck = ({ userId }: { userId: UserData }) => { 
    const [cards, setCards] = useState<flashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const id = userId.id

    useEffect(() => {
        const getCard = async () => {
            if (!userId) return;
            setLoading(true);

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
            } finally {
                setLoading(false);
            }
        };

        getCard();
    }, [userId, id]); 

    return (
        <div className='m-5 p-8 '>
            <div className='text-white flex items-center justify-between'>
                <h2 className='text-4xl text-gray-200 font-bold'>Your Recent Deck</h2>
                <Link href={`/alldecks/${userId.id}`} className='text-[#4ade80] underline'>View All</Link>
            </div>

            {loading ? (
                <div className='w-full mt-12 flex flex-col items-center justify-center gap-4'>
                    <p className='text-[#c4f8e2] text-xl font-medium animate-pulse'>
                        Fetching your decks...
                    </p>
                    <div className='w-48 h-1 bg-white/10 rounded-full overflow-hidden'>
                        <div className='h-full bg-[#c4f8e2] animate-[loading_1.5s_ease-in-out_infinite] w-1/2'></div>
                    </div>
                </div>
            ) : (
                <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {cards.length > 0 ? (
                        cards.slice(0, 4).map((card) => (
                            <DeckCard key={card.flashcardID} card={card} />
                        ))
                    ) : (
                        <p className='text-gray-500 col-span-4 mt-4'>No decks found. Create your first one!</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Deck;