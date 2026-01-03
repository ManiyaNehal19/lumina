import React from 'react'
import { flashcard } from '..'
import { Book } from 'lucide-react';

const DeckCard = ({card}:{card:flashcard}) => {
  console.log(card);
  const date = new Date(card.createdAt);
  
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
    return (
  <div className="flex flex-col items-start gap-4 rounded-3xl bg-[#0f0f1b] p-6 text-white transition-all hover:bg-[#161629] border border-white/5 w-full max-w-sm">
     
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2b251a]">
        <Book size={24} className="text-yellow-400" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-semibold ">
          {card.topic}
        </h3>
        <p className="text-sm text-slate-400">
          {card.content.length} cards
        </p>
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-500 uppercase ">
          Created {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default DeckCard