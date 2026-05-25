export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 mt-12 border-t-4 border-doj-gold">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-doj-gold rounded-full flex items-center justify-center text-doj-navy font-bold text-[8px] text-center shrink-0">
              DOJ
            </div>
            <h2 className="text-xl font-serif text-white m-0">U.S. Department of Justice</h2>
          </div>
          <p className="text-sm text-gray-400">
            950 Pennsylvania Avenue, NW<br />
            Washington, DC 20530-0001
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Archive</a>
            <a href="#" className="hover:underline">FOIA</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Legal Policies & Disclosures</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:underline">No FEAR Act</a>
            <a href="#" className="hover:underline">Office of the Inspector General</a>
            <a href="#" className="hover:underline">USA.gov</a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>This is a fictitious website created for demonstration purposes (Les JexSoJo files).</p>
      </div>
    </footer>
  );
}
