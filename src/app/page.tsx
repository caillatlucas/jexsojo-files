"use client";

import { useState } from 'react';
import FileList from '@/components/FileList';
import FileUploader from '@/components/FileUploader';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-serif text-doj-navy mb-4 border-b-4 border-doj-gold pb-2 inline-block">
          Les JexSoJo Library
        </h1>
        
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-8 mt-4">
          <h2 className="text-xl font-bold mb-2">Privacy Notice</h2>
          <div className="w-12 h-1 bg-doj-gold mb-4"></div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            In view of the recent mandates, all reasonable efforts have been made to review and redact personal information pertaining to victims, other private individuals, and protect sensitive materials from disclosure. That said, because of the volume of information involved, this website may nevertheless contain information that inadvertently includes non-public personally identifiable information.
          </p>
          <p className="text-sm font-semibold italic text-doj-navy">
            This site houses materials responsive under the Transparency Act. This site will be updated if additional documents are identified for release.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-doj-navy">Available Disclosures</h2>
        
        {/* Toggle Admin mode for demo purposes */}
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className="text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          {isAdmin ? "Exit Admin Mode" : "Admin Login (Demo)"}
        </button>
      </div>

      {isAdmin && (
        <div className="mb-8">
          <FileUploader />
        </div>
      )}

      <div className="bg-white border border-gray-200 shadow-sm rounded p-6">
        <FileList />
      </div>
    </div>
  );
}
