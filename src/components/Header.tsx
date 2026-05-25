import { Search, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-doj-navy text-white">
      {/* Top Banner - Unofficial */}
      <div className="bg-gray-100 text-gray-800 text-xs py-1 px-4 border-b border-gray-300">
        <div className="container mx-auto flex items-center gap-2">
          {/* Faux drapeau américain simplifié */}
          <div className="w-4 h-3 bg-blue-800 relative flex shrink-0 border border-gray-400">
            <div className="w-1/2 h-full bg-blue-900 absolute left-0 top-0"></div>
            <div className="w-full h-[2px] bg-red-600 absolute top-0"></div>
            <div className="w-full h-[2px] bg-red-600 absolute top-1/2 mt-[-1px]"></div>
            <div className="w-full h-[2px] bg-red-600 absolute bottom-0"></div>
          </div>
          <span>An <strong>unofficial</strong> website of the United States government</span>
          <a href="#" className="text-blue-600 hover:underline ml-1">Here's how you know <ChevronDown className="inline w-3 h-3" /></a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-doj-gold rounded-full flex items-center justify-center text-doj-navy border-2 border-doj-gold shadow-lg shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 8v4"/>
              <path d="M12 16h.01"/>
            </svg>
          </div>
          
          <div className="text-left">
            <h1 className="text-2xl md:text-4xl font-serif text-white tracking-wide leading-tight">
              U.S. Department of<br/>
              <span className="text-3xl md:text-5xl font-serif tracking-widest">JUSTICE</span>
            </h1>
          </div>
        </div>
        
        {/* Right side links and search */}
        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
          <div className="flex gap-4 text-sm font-semibold">
            <a href="#" className="hover:text-doj-gold transition-colors">Our Offices</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-doj-gold transition-colors">Find Help</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-doj-gold transition-colors">Contact Us</a>
          </div>
          <div className="flex w-full md:w-64 h-8 mt-1">
            <input 
              type="text" 
              placeholder="Search" 
              className="flex-grow px-3 text-sm text-black focus:outline-none"
            />
            <button className="bg-doj-gold w-10 flex items-center justify-center text-doj-navy hover:bg-yellow-500 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Categories / Navigation */}
      <nav className="bg-[#1a1a1a] border-t-[5px] border-doj-gold">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-start gap-8 text-[15px] font-bold py-3">
          <a href="#category-all" className="text-white hover:text-doj-gold transition-colors flex items-center gap-1">About <ChevronDown className="w-4 h-4" /></a>
          <a href="#category-documents" className="text-white hover:text-doj-gold transition-colors">Our Work</a>
          <a href="#category-recent" className="text-white hover:text-doj-gold transition-colors flex items-center gap-1">News <ChevronDown className="w-4 h-4" /></a>
          <a href="#category-images" className="text-white hover:text-doj-gold transition-colors flex items-center gap-1">Resources <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="text-white hover:text-doj-gold transition-colors">Grants</a>
          <a href="#" className="text-white hover:text-doj-gold transition-colors flex items-center gap-1">Employment <ChevronDown className="w-4 h-4" /></a>
        </div>
      </nav>
    </header>
  );
}
