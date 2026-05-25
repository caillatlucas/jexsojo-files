"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FileText, Download, Image as ImageIcon } from 'lucide-react';

type JexsojoFile = {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export default function FileList() {
  const [files, setFiles] = useState<JexsojoFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();

    const channel = supabase
      .channel('public:jexsojo_files')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'jexsojo_files' }, payload => {
        setFiles(current => [payload.new as JexsojoFile, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchFiles() {
    try {
      const { data, error } = await supabase
        .from('jexsojo_files')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
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
    if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6 text-blue-500" />;
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading disclosures...</div>;

  if (files.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
        No documents have been disclosed yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors group">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded shadow-sm border border-gray-200">
              {getFileIcon(file.file_type)}
            </div>
            <div>
              <h3 className="font-semibold text-doj-navy">{file.file_name}</h3>
              <div className="text-xs text-gray-500 flex gap-3 mt-1">
                <span>{new Date(file.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>{formatSize(file.file_size)}</span>
              </div>
            </div>
          </div>
          
          <a 
            href={file.file_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-doj-navy hover:bg-doj-navy/90 text-white px-4 py-2 rounded text-sm font-semibold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
