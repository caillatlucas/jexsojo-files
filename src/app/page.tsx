"use client";

import { useState } from 'react';
import FileList from '@/components/FileList';
import FileUploader from '@/components/FileUploader';
import { ChevronRight, Share2, Lock } from 'lucide-react';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'DOJ' && password === 'DOJ32') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Identifiants incorrects.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center text-sm text-gray-500">
          <a href="https://www.justice.gov" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Justice.gov</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-700">JexSoJo Library</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        {/* Main Title Section */}
        <div className="mb-12 relative">
          <h1 className="text-[40px] font-serif text-[#002244] mb-6">
            JexSoJo Library
          </h1>
          <div className="flex flex-col gap-[2px] mb-8">
            <div className="w-14 h-[3px] bg-[#D4AF37]"></div>
            <div className="w-14 h-[1px] bg-[#D4AF37]"></div>
          </div>
          
          <div className="flex justify-between items-center">
            <button onClick={handleShare} className="flex items-center gap-2 bg-[#005e8d] hover:bg-[#004b70] text-white px-4 py-2 font-bold text-sm transition-colors">
              Share <span className="border-l border-white/30 pl-2 ml-1"><ChevronRight className="w-4 h-4" /></span>
            </button>

            {/* Login Toggle */}
            {!isAdmin ? (
              <button 
                onClick={() => setShowLogin(!showLogin)}
                className="text-xs text-gray-400 hover:text-gray-600 transition flex items-center gap-1"
              >
                <Lock className="w-3 h-3" /> Admin Access
              </button>
            ) : (
              <button 
                onClick={() => setIsAdmin(false)}
                className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition font-semibold"
              >
                Logout (DOJ Admin)
              </button>
            )}
          </div>

          {/* Login Modal / Dropdown */}
          {showLogin && !isAdmin && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 shadow-xl p-4 z-10">
              <h3 className="font-bold text-[#002244] mb-3">Authorized Personnel Only</h3>
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border px-3 py-2 text-sm w-full"
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border px-3 py-2 text-sm w-full"
                />
                {loginError && <p className="text-red-600 text-xs">{loginError}</p>}
                <button type="submit" className="bg-[#002244] text-white py-2 text-sm font-bold w-full hover:bg-blue-900 transition">
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
        
        {/* Privacy Notice Panel */}
        <div className="bg-[#f1f6fb] p-8 mb-12">
          <h2 className="text-2xl font-serif text-[#002244] mb-4">Privacy Notice</h2>
          <div className="flex flex-col gap-[2px] mb-6">
            <div className="w-14 h-[3px] bg-[#D4AF37]"></div>
            <div className="w-14 h-[1px] bg-[#D4AF37]"></div>
          </div>
          <p className="text-[15px] text-gray-700 leading-relaxed mb-4">
            In view of the Congressional deadline, all reasonable efforts have been made to review and redact personal information pertaining to victims, other private individuals, and protect sensitive materials from disclosure. That said, because of the volume of information involved, this website may nevertheless contain information that inadvertently includes non-public personally identifiable information or other sensitive content, to include matters of a sexual nature. In the event a member of the public identifies any information that should not have been posted, please notify us immediately by email at <a href="mailto:contact@jexsojofiles.fake" className="text-blue-700 underline font-semibold">contact@jexsojofiles.fake</a> (<em>Note: This is a completely fictitious website created for demonstration purposes</em>) so we can take steps to correct the problem as soon as possible.
          </p>
          <p className="text-[15px] font-bold italic text-[#002244] mt-6">
            This site houses materials responsive under the Transparency Act. This site will be updated if additional documents are identified for release.
          </p>
        </div>

        {/* Upload Section (Admin only) */}
        {isAdmin && (
          <div className="mb-12">
            <FileUploader onUploadSuccess={() => setRefreshTrigger(prev => prev + 1)} />
          </div>
        )}

        {/* File List */}
        <div>
          <FileList isAdmin={isAdmin} refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
