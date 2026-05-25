"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UploadCloud, Loader2 } from 'lucide-react';

export default function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // 1. Upload file to Supabase Storage (requires a 'jexsojo-bucket' bucket)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('jexsojo-bucket')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('jexsojo-bucket')
        .getPublicUrl(filePath);

      // 3. Insert record into database
      const { error: dbError } = await supabase
        .from('jexsojo_files')
        .insert({
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size
        });

      if (dbError) throw dbError;
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white border-2 border-dashed border-doj-gold/50 rounded-lg text-center">
      <h3 className="text-lg font-semibold text-doj-navy mb-2">Secure Upload Portal</h3>
      <p className="text-sm text-gray-500 mb-6">Only authorized personnel may upload files to this directory.</p>
      
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      
      <label className="cursor-pointer inline-flex items-center gap-2 bg-doj-navy hover:bg-doj-navy/90 text-white px-6 py-3 rounded font-semibold transition-colors">
        {uploading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <UploadCloud className="w-5 h-5" />
        )}
        {uploading ? 'Uploading and synchronizing...' : 'Select File to Upload'}
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
