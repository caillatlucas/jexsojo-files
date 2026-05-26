"use client";

import { Mail, Phone, Smartphone, ExternalLink, ChevronUp, Facebook, Youtube, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2B2B2B] text-white pt-8 mt-12 border-t-4 border-[#D4AF37] font-sans">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pb-8">
        {/* Top Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#002244] font-bold text-xs text-center shrink-0 border-2 border-white/20 relative overflow-hidden">
              <div className="absolute inset-1 border border-white/40 rounded-full flex items-center justify-center">
                 DOJ
              </div>
            </div>
            <h2 className="flex flex-col font-serif text-white m-0">
              <span className="text-lg font-normal tracking-wide">U.S. Department of</span>
              <span className="text-[2.5rem] leading-none tracking-wider">JUSTICE</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 text-sm max-w-5xl mx-auto">
          {/* Column 1 */}
          <div className="flex items-start gap-3 flex-1">
            <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <h3 className="font-bold mb-1 text-base">U.S. Department of Justice</h3>
              <p className="text-gray-100">
                950 Pennsylvania Avenue NW<br />
                Washington DC 20530
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex items-start gap-3 flex-1">
            <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <a href="#" className="underline font-bold mb-1 text-base hover:text-gray-300">Contact the Department</a>
              <p className="text-gray-100 mb-1">Phone: 202-514-2000</p>
              <div className="flex items-center gap-1 text-gray-100">
                <a href="#" className="underline hover:text-white flex items-center gap-1 font-bold">TTY: 711 <ExternalLink className="w-3.5 h-3.5" /></a>
                <span className="mx-1">|</span>
                <a href="#" className="underline hover:text-white flex items-center gap-1 font-bold">TRS Info <ExternalLink className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex items-start gap-3 flex-1">
            <Smartphone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="flex flex-col w-full">
              <a href="#" className="underline font-bold mb-3 text-base hover:text-gray-300 flex items-center gap-1">
                Signup for Email Updates <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="underline font-bold mb-2 text-base hover:text-gray-300">Social Media</a>
              <div className="flex items-center gap-4 text-[#D4AF37] mt-1">
                <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5 fill-current" /></a>
                <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5 fill-current" /></a>
                <a href="#" className="hover:text-white transition-colors"><Youtube className="w-6 h-6 fill-current" /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5 fill-current" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#1a1a1a] pt-10 pb-12 w-full relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-[13px] font-bold">
            <div className="flex flex-col gap-5">
              <a href="#" className="hover:underline text-white">About</a>
              <a href="#" className="hover:underline text-white">Budget & Performance</a>
              <a href="#" className="hover:underline text-white">Archives</a>
              <a href="#" className="hover:underline text-white">FOIA</a>
            </div>
            <div className="flex flex-col gap-5">
              <a href="#" className="hover:underline text-white">Accessibility</a>
              <a href="#" className="hover:underline text-white">Legal Policies & Disclaimers</a>
              <a href="#" className="hover:underline text-white">Privacy</a>
              <a href="#" className="hover:underline text-white">For Employees</a>
            </div>
            <div className="flex flex-col gap-5">
              <a href="#" className="hover:underline text-white">Office of the Inspector<br/>General</a>
              <a href="#" className="hover:underline text-white">No FEAR Act Data</a>
              <a href="#" className="hover:underline text-white">EEO Policy Statement</a>
              <a href="#" className="hover:underline text-white">Vulnerability Disclosure</a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:underline text-white mb-1">Multilingual</a>
              <a href="#" className="hover:underline text-white flex items-center gap-1 mb-1">Vote.gov <ExternalLink className="w-3.5 h-3.5" /></a>
              <div className="mt-1">
                <p className="text-[#D4AF37] mb-1 font-bold">Have a question about<br/>Government Services?</p>
                <a href="#" className="hover:underline text-white flex items-center gap-1">Contact USA.gov <ExternalLink className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button 
          onClick={scrollToTop}
          className="absolute right-4 bottom-8 md:right-12 bg-[#005c8a] hover:bg-[#004f70] text-white w-[52px] h-[52px] rounded-full flex flex-col items-center justify-center text-[11px] font-bold transition-colors shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 -mb-1 stroke-[3]" />
          TOP
        </button>
      </div>
    </footer>
  );
}
