"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import star from '@/app/assests/c56b33cc-c856-4040-b003-c080d2183a97_removalai_preview.png'
import axios from 'axios'
import { UserData } from '..'
import { useRouter } from 'next/navigation'

const MAX_NOTE_LENGTH = 2500;

const AInput = ({ userId }: { userId: UserData }) => {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [no_of_card, set_no_of_card] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [type, settype] = useState("t");

    const overl = type === 'n' && topic.length > MAX_NOTE_LENGTH;

    const generateResponse = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!topic.trim()) {
            alert("Please enter a topic or paste notes");
            return;
        }

        setIsLoading(true);

        try {
            let response;
            if (type == 't') {
                response = await axios.post("/api/generate", { topic, no_of_card });
            } else {
                response = await axios.post("/api/note_card", { topic, no_of_card });
            }

            const submit = await axios.post("/api/flashcard", {
                content: response?.data.data,
                userId: userId,
                topic: type === 't' ? topic : 'Untitled' 
            });

            router.push(`/flashcards/${submit.data.id_flash}`);

        } catch (error) {
            console.error("🔴 FRONTEND: Error:", error);
            alert("Failed to generate flashcards. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-full flex flex-col items-center rounded-lg justify-center'>
            <div className='flex justify-center items-center flex-col'>
                <p className='text-white text-sm flex justify-center items-center'>
                    <Image src={star} alt='star' height={40} width={40} />
                    AI Powered Learning
                </p>
                <h1 className='text-white text-7xl font-bold m-2 text-center'>
                    Welcome To <span className='text-[#4ade80]'>Lumina</span>
                </h1>
                <p className='text-gray-400 max-w-xl text-center mt-2'>
                    Generate intelligent flashcards from any topic and master your knowledge with spaced repetition.
                </p>
            </div>

            <div className='mt-6 flex justify-center items-center gap-4' >
                <button
                    type="button"
                    className={`text-white rounded-lg px-4 py-2 transition-colors ${type == 't' ? 'bg-[#4ADE80] text-[#15122D] font-bold' : 'bg-gray-600'}`}
                    onClick={() => { settype('t'); setTopic(""); }}
                >
                    Topic
                </button>
                <button
                    type="button"
                    className={`text-white rounded-lg px-4 py-2 transition-colors ${type == 'n' ? 'bg-[#4ADE80] text-[#15122D] font-bold' : 'bg-gray-600'}`}
                    onClick={() => { settype('n'); setTopic(""); }}
                >
                    Notes
                </button>
            </div>

            <div className='flex flex-col items-center mt-6 w-full'>
                <form
                    className='w-full flex flex-col justify-center items-center gap-6'
                    onSubmit={generateResponse}
                >
                    <div className="w-3/5 relative">
                        {type === 't' ? (
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Enter a topic (e.g. Quantum Physics)..."
                                className='bg-[#15122D] p-5 w-full rounded-full text-white outline-none border border-transparent focus:border-[#4ade80] transition-all'
                                disabled={isLoading}
                            />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <textarea
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Paste your long notes here..."
                                    className='bg-[#15122D] p-5 w-full h-48 rounded-2xl text-white outline-none border border-transparent focus:border-[#4ade80] transition-all resize-none'
                                    disabled={isLoading}
                                />
                                <div className={`text-xs self-end ${overl ? 'text-red-500' : 'text-gray-500'}`}>
                                    {topic.length.toLocaleString()} / {MAX_NOTE_LENGTH.toLocaleString()} characters
                                    {overl && " (Too long for AI)"}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <select
                            name="items"
                            id="items"
                            value={no_of_card}
                            onChange={(e) => set_no_of_card(Number(e.target.value))}
                            className='bg-[#15122D] text-white p-5 rounded-full outline-none border border-transparent focus:border-[#4ade80] transition-all cursor-pointer hover:bg-[#1a1640]'
                            disabled={isLoading}
                        >
                            <option value={10}>10 Cards</option>
                            <option value={20}>20 Cards</option>
                            <option value={30}>30 Cards</option>
                        </select>

                        <button
                            type="submit"
                            disabled={isLoading || overl}
                            className='bg-[#4ade80] text-[#15122D] font-bold rounded-full px-8 py-5 hover:bg-[#3bc771] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Creating...' : 'Create Flashcards'}
                        </button>
                    </div>
                </form>
            </div>

            <p className='text-gray-500 max-w-xl text-center mt-6'>
                Powered by AI &bull; Generate unlimited flashcards
            </p>
        </div>
    )
}

export default AInput