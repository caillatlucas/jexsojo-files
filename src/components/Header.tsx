export default function Header() {
  return (
    <header className="bg-doj-navy text-white">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4">
        <div className="w-16 h-16 bg-doj-gold rounded-full flex items-center justify-center text-doj-navy font-bold text-xs text-center border-2 border-white shadow-lg overflow-hidden shrink-0">
          <span className="block leading-tight px-1">Department<br/>of<br/>Justice</span>
        </div>
        <div className="flex-grow">
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
      <nav className="bg-doj-darkGray py-3 border-t border-doj-gold/20">
        <div className="container mx-auto px-4 flex gap-6 text-sm font-semibold uppercase">
          <a href="#" className="text-doj-gold hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-doj-gold transition-colors">Our Work</a>
          <a href="#" className="hover:text-doj-gold transition-colors">News</a>
          <a href="#" className="hover:text-doj-gold transition-colors">Resources</a>
        </div>
      </nav>
    </header>
  );
}
