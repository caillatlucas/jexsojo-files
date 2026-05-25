export default function Header() {
  return (
    <header className="bg-doj-navy text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Simple Logo with SVG */}
        <div className="w-16 h-16 bg-doj-gold rounded-full flex items-center justify-center text-doj-navy border-2 border-white shadow-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"/>
            <path d="M12 21V3"/>
            <path d="M3 9l9-6 9 6"/>
            <path d="M12 14c-2.5 0-5 2.5-5 5h10c0-2.5-2.5-5-5-5z"/>
          </svg>
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide mb-1">
            THE DEPARTMENT OF JUSTICE
          </h1>
          <p className="text-xs uppercase tracking-widest text-doj-gold font-semibold">
            Official Portal • Les JexSoJo Files
          </p>
        </div>
        
        <div className="hidden md:flex gap-4 text-sm font-semibold">
          <a href="#" className="hover:text-doj-gold transition-colors">Our Offices</a>
          <a href="#" className="hover:text-doj-gold transition-colors">Find Help</a>
          <a href="#" className="hover:text-doj-gold transition-colors">Contact Us</a>
        </div>
      </div>
      
      {/* Categories / Navigation */}
      <nav className="bg-doj-darkGray py-3 border-t border-doj-gold/20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-start gap-6 text-sm font-semibold uppercase">
          <a href="#category-all" className="text-doj-gold hover:text-white transition-colors">All Disclosures</a>
          <a href="#category-images" className="hover:text-doj-gold transition-colors">Images & Media</a>
          <a href="#category-documents" className="hover:text-doj-gold transition-colors">Legal Documents</a>
          <a href="#category-recent" className="hover:text-doj-gold transition-colors">Recently Added</a>
        </div>
      </nav>
    </header>
  );
}
