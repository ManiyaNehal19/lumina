import Image from "next/image"
import logo from '@/app/assests/Abstract hexagonal gradient logo design.png'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      
      <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-[#16181d] to-[#343c57] p-12 text-white border-r border-white/5">
        
        <div className="max-w-md mx-auto w-full">
          
          <div className="flex items-center gap-3 mb-8">
            <Image 
              src={logo} 
              alt="logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
            <h1 className="text-3xl font-bold tracking-tight text-[#4ade80]">Lumina</h1>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
            Master anything with <br />
            <span className="text-white/60">AI-powered flashcards</span>
          </h2>

          <p className="text-lg text-white/40 mb-12">
            Transform the way you learn with intelligent spaced repetition and AI-generated study materials.
          </p>

          <div className="pt-8 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="space-y-1">
                <p className="text-[15px] text-white/70 leading-snug italic">
                  &quot;The beautiful thing about learning is that no one can take it away from you.&quot;
                </p>
                <p className="text-[#4ade80] text-sm font-medium">— B.B. King</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#1a2137]">
       
          {children}
        
      </div>
    </div>
  )
}