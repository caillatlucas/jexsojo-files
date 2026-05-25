"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FileText, Download, Image as ImageIcon, Trash2 } from 'lucide-react';

type JexsojoFile = {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export default function FileList({ isAdmin, refreshTrigger = 0 }: { isAdmin?: boolean; refreshTrigger?: number }) {
  const [files, setFiles] = useState<JexsojoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Disclosures');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Search state
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  // Re-fetch when refreshTrigger changes
  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  useEffect(() => {
    // Listen to hash changes for category filtering
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#category-images') setActiveCategory('Images & Media');
      else if (hash === '#category-documents') setActiveCategory('Our Work (Documents)');
      else if (hash === '#category-recent') setActiveCategory('Recently Added (News)');
      else setActiveCategory('All Disclosures');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    const channel = supabase
      .channel('public:jexsojo_files')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jexsojo_files' }, payload => {
        if (payload.eventType === 'INSERT') {
          // Verify it's not already in the list to avoid duplicates
          setFiles(current => {
            if (current.some(f => f.id === payload.new.id)) return current;
            return [payload.new as JexsojoFile, ...current];
          });
        } else if (payload.eventType === 'DELETE') {
          setFiles(current => current.filter(f => f.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchFiles() {
    try {
      const { data, error } = await supabase
        .from('jexsojo_files')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) console.error('Database connection error:', error);
      if (data) setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(file: JexsojoFile) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer définitivement "${file.file_name}" ?`)) return;
    
    setDeletingId(file.id);
    try {
      const { error: dbError } = await supabase
        .from('jexsojo_files')
        .delete()
        .eq('id', file.id);
      
      if (dbError) throw dbError;

      const urlParts = file.file_url.split('/jexsojo-bucket/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('jexsojo-bucket').remove([filePath]);
      }
      
    } catch (err: any) {
      console.error(err);
      alert("Erreur lors de la suppression: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6 text-[#005e8d]" />;
    return <FileText className="w-6 h-6 text-gray-600" />;
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActiveSearch(searchInput);
  };

  const filteredFiles = files.filter(file => {
    // 1. Search filter
    if (activeSearch && !file.file_name.toLowerCase().includes(activeSearch.toLowerCase())) {
      return false;
    }
    
    // 2. Category filter
    if (activeCategory === 'Images & Media') return file.file_type.startsWith('image/');
    if (activeCategory === 'Our Work (Documents)') return file.file_type.includes('pdf') || file.file_type.includes('document') || file.file_type.includes('text');
    if (activeCategory === 'Recently Added (News)') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(file.created_at) >= oneWeekAgo;
    }
    return true; 
  });

  if (loading) return <div className="p-12 text-center text-gray-500">Loading library contents...</div>;

  return (
    <div>
      <div className="bg-[#f1f6fb] p-6 mb-8 border border-[#e1ebf4]">
        <h2 className="text-xl font-bold text-[#002244] mb-2">Search Full Library</h2>
        <div className="w-8 h-1 bg-[#D4AF37] mb-6"></div>
        <form onSubmit={handleSearch} className="flex max-w-2xl">
          <input 
            type="text" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Type to search..." 
            className="flex-grow px-4 py-2 border border-gray-400 focus:outline-none text-black" 
          />
          <button type="submit" className="bg-[#005e8d] hover:bg-[#004b70] text-white px-6 py-2 font-bold transition-colors">Search</button>
        </form>
        {activeSearch && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold">Results for "{activeSearch}"</span>
            <button onClick={() => { setSearchInput(''); setActiveSearch(''); }} className="text-xs text-blue-600 hover:underline">(Clear search)</button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4 italic">
          <strong>Note on Search Functionality:</strong> Due to individual limitations and the format of certain materials (e.g. handwritten text), portions of these documents may not be electronically searchable.
        </p>
      </div>

      <h3 className="font-serif text-2xl text-[#002244] mb-4">
        {activeCategory} <span className="text-lg text-gray-400">({filteredFiles.length} files)</span>
      </h3>
      
      {filteredFiles.length === 0 ? (
        <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300">
          No records found matching these criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFiles.map((file) => (
            <div key={file.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-5 mb-4 sm:mb-0">
                <div className="bg-[#f1f6fb] p-3 rounded-full">
                  {getFileIcon(file.file_type)}
                </div>
                <div>
                  <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="font-bold text-[17px] text-[#002244] hover:underline break-all mb-1 block">
                    {file.file_name}
                  </a>
                  <div className="text-xs text-gray-500 flex gap-3">
                    <span>Added: {new Date(file.created_at).toLocaleDateString()}</span>
                    <span>|</span>
                    <span>Size: {formatSize(file.file_size)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                {isAdmin && (
                  <button 
                    onClick={() => handleDelete(file)}
                    disabled={deletingId === file.id}
                    className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50 border border-red-200"
                    title="Delete permanently"
                  >
                    {deletingId === file.id ? "..." : <Trash2 className="w-4 h-4" />}
                  </button>
                )}
                
                <a 
                  href={file.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-[#002244] hover:bg-[#00152b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
