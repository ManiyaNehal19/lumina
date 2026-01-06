import star from '@/app/assests/c56b33cc-c856-4040-b003-c080d2183a97_removalai_preview.png'
import { ArrowRight, Brain, MoonStarIcon, Layout } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const NoSign = () => {
  return (
    <div className='w-full h-full  flex flex-col items-center  and  rounded-lg justify-center p-4'>
      <div className='flex justify-center items-center flex-col'>
        <p className='text-white text-sm flex justify-center items-center'>
          <Image src={star} alt='star' height={40} width={40}/> 
          AI Powered Learning
        </p>
        <h1 className='text-white text-7xl font-bold m-2 text-center'>
          Master anything with
        </h1>
        <p className='text-[#4ade80] text-7xl font-bold m-2 text-center'>Lumina</p>
        <p className='text-gray-400 max-w-xl text-center mt-2'>
          Generate intelligent flashcards from any topic and master your knowledge with spaced repetition.
        </p>
      </div>

      <div className='flex items-center justify-center gap-3 mt-6 w-full'>
        <Link href="/sign-up" className='bg-[#c4f8e2] flex text-black font-semibold items-center text-lg rounded-lg hover:bg-[#C4F8EE] w-1/8 p-4 flex justify-center gap-1 transition-all shadow-[0_0_15px_rgba(196,248,226,0.4)]'>
          Get Started <ArrowRight size={24} color='black'/>
        </Link>
        <Link href="/sign-in" className='bg-[#0C0C15] text-white font-bold rounded-lg text-lg w-1/8 p-4 text-center hover:bg-[#333077] transition-all border border-white/10'>
          Sign In
        </Link>
      </div>

      <div className='text-white flex flex-wrap justify-center items-stretch gap-8 w-full p-10 mt-10'>
        
        <div className='w-full md:w-1/4 py-12 bg-[#1a1a2e] border border-[#c4f8e2]/20 rounded-2xl flex items-center justify-center flex-col gap-4 p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(96,248,226,0.3)] group'>
          <div className='p-4 bg-[#c4f8e2]/10 rounded-xl border border-[#c4f8e2]/30 group-hover:bg-[#c4f8e2]/20 transition-colors'>
             <Brain size={32} className='text-[#c4f8e2] drop-shadow-[0_0_8px_rgba(196,248,226,0.8)]' />
          </div>
          <h4 className='font-bold text-xl'>AI-Powered Generation</h4>
          <p className='text-gray-400 text-center leading-relaxed'>Create flashcards from any topic instantly with our intelligent AI</p>
        </div>

        <div className='w-full md:w-1/4 py-12 bg-[#1a1a2e] border border-[#c4f8e2]/20 rounded-2xl flex items-center justify-center flex-col gap-4 p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(196,248,226,0.3)] group'>
          <div className='p-4 bg-[#c4f8e2]/10 rounded-xl border border-[#c4f8e2]/30 group-hover:bg-[#c4f8e2]/20 transition-colors'>
             <MoonStarIcon size={32} className='text-[#c4f8e2] drop-shadow-[0_0_8px_rgba(196,248,226,0.8)]' />
          </div>
          <h4 className='font-bold text-xl'>Spaced Repetition</h4>
          <p className='text-gray-400 text-center leading-relaxed'>Optimize your learning with scientifically-proven study methods</p>
        </div>

        <div className='w-full md:w-1/4 py-12 bg-[#1a1a2e] border border-[#c4f8e2]/20 rounded-2xl flex items-center justify-center flex-col gap-4 p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(196,248,226,0.3)] group'>
          <div className='p-4 bg-[#c4f8e2]/10 rounded-xl border border-[#c4f8e2]/30 group-hover:bg-[#c4f8e2]/20 transition-colors'>
             <Layout size={32} className='text-[#c4f8e2] drop-shadow-[0_0_8px_rgba(196,248,226,0.8)]' />
          </div>
          <h4 className='font-bold text-xl'>Clean UI</h4>
          <p className='text-gray-400 text-center leading-relaxed'>Focus on your studies with a minimalist and distraction-free interface</p>
        </div>

      </div>
    </div>
  )
}

export default NoSign