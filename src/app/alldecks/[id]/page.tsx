"use client"
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import DeckCard from '../../components/DeckCard'
import { flashcard } from '../..'

const Page = () => {
    const [cards, setCards] = useState<flashcard[]>([]);
    const [sortBy, setSortBy] = useState<string>("date-asc");
    const [loading, setLoading] = useState<boolean>(true);
    
    
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const getCard = async () => {
            if (!id) return;
            setLoading(true);

            try {
                const response = await axios.get("/api/allcard", { params: { id } });
                const fetchedCards = response.data.message;
                setCards(fetchedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }finally {
                setLoading(false);
            }
        };

        getCard();
    }, [id]); 

    const sortedCards = useMemo(() => {
        const sorted = [...cards];

        switch (sortBy) {
            case "date-asc":
                return sorted.sort((a, b) => 
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
            
            case "date-desc":
                return sorted.sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            
            case "topic-asc":
                return sorted.sort((a, b) => 
                    a.topic.localeCompare(b.topic, undefined, { sensitivity: 'base' })
                );
            
            case "topic-desc":
                return sorted.sort((a, b) => 
                    b.topic.localeCompare(a.topic, undefined, { sensitivity: 'base' })
                );
            
            default:
                return sorted;
        }
    }, [cards, sortBy]);
    

    return (
        <div className='p-5'>
            <div className='flex items-center justify-between'>
                <h2 className='text-4xl text-gray-200 font-bold'>All Decks</h2>
                
                <select 
                    name="sort" 
                    id="sort" 
                    value={sortBy}
                    onChange={(e)=>setSortBy(e.target.value)}
                    className='text-[#4ade80] bg-[#030305] p-3 outline-none border border-transparent focus:border-[#4ade80] transition-all cursor-pointer hover:bg-[#1a1640] mr-1 rounded-lg' 
                >
                    <option value="date-asc">Date: Oldest First</option>
                    <option value="date-desc">Date: Newest First</option>
                    <option value="topic-asc">Topic: A to Z</option>
                    <option value="topic-desc">Topic: Z to A</option>
                </select>
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
            <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {sortedCards.length > 0 ? (
                    sortedCards.map((card) => (
                        <DeckCard key={card.flashcardID} card={card} />
                    ))
                ) : (
                    <p className='text-gray-400 col-span-full text-center py-10'>
                        No flashcards found. Create your first deck!
                    </p>
                )}
            </div>
        )}
        </div>
    )
}

export default Page