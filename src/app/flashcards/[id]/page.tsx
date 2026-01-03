"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardFlip from '@/app/components/CardFlip'
import { Card } from '@/app'
import { FourSquare } from 'react-loading-indicators'
const Page = () => {
  const { id } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [loading, setLoading] = useState(true);

  const getCards = async () => {
    try {
      const response = await axios.get("/api/flashcard", { params: { id } });
      const fetchedCards = response.data.content.content;
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCards();
    }
  }, [id]);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) {
  return (
      <div className=' h-screen flex justify-center items-center'>
     <FourSquare color="#4ade80" size="medium" text="" textColor="" />

      </div>
  );
}
  if (cards.length === 0) return <div className="text-white">No cards found.</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 pb-2">
      <p className="text-gray-400">Card {currentIndex + 1} of {cards.length}</p>

      <div>
        <CardFlip 
          front={cards[currentIndex].front} 
          back={cards[currentIndex].back} 
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="px-6 py-2 bg-gray-700 hover:cursor-pointer hover:bg-gray-800 text-white rounded-lg disabled:opacity-30"
        >
          Previous
        </button>
        <button 
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="px-6 py-2 bg-[#4ade80] text-[#15122D] hover:cursor-pointer hover:bg-[#52cb7e] font-bold rounded-lg disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Page;