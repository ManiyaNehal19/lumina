import Link from 'next/link'
import {LayoutDashboard, Book, LogOut} from 'lucide-react'
import { auth, currentUser } from '@clerk/nextjs/server'

import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lumina',
  description: 'Lumina-AI powered Flashcards',
}

async function Sidebar() {
  const { userId } = await auth();

  return (
    <nav className='w-fit p-5 h-full bg-[#111120] flex flex-col justify-center gap-10 border-r border-white/5'>
      <Link href="/" className="group">
           <LayoutDashboard size={32} className='text-[#4ade80] transition-transform group-hover:scale-110' />
      </Link>
      
      {userId && (
        <Link href={`/alldecks/${userId}`} className="group">
           <Book size={32} className='text-[#4ade80] transition-transform group-hover:scale-110' />
        </Link>
      )}
      
      {userId && (
        <SignOutButton redirectUrl="/">
          <button className="p-2 rounded-xl transition-all duration-300 text-red-400 hover:bg-red-400/10 group">
            <LogOut size={28} className="group-hover:scale-110 transition-transform" />
          </button>
        </SignOutButton>
      )}
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex`}>
          <Sidebar />
          <main className='flex-1'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}