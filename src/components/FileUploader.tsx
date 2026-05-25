"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UploadCloud, Loader2, AlertCircle } from 'lucide-react';

export default function FileUploader({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setSuccess(false);
      
      const file = event.target.files?.[0];
      if (!file) return;

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
        throw new Error("⚠️ Supabase n'est pas configuré. Veuillez ajouter vos clés dans .env.local.");
      }

      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('jexsojo-bucket')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('relation "buckets" does not exist')) {
          throw new Error("⚠️ Le bucket 'jexsojo-bucket' n'existe pas ou n'est pas public sur votre projet Supabase.");
        }
        if (uploadError.message.includes('row-level security')) {
          throw new Error("⚠️ Erreur de permissions RLS. Assurez-vous d'avoir autorisé l'INSERT public/authentifié dans Supabase.");
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('jexsojo-bucket')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('jexsojo_files')
        .insert({
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size
        });

      if (dbError) {
        if (dbError.message.includes('does not exist')) {
           throw new Error("⚠️ La table 'jexsojo_files' n'a pas encore été créée dans votre base de données Supabase.");
        }
        throw dbError;
      }
      
      setSuccess(true);
      if (onUploadSuccess) onUploadSuccess();
      
      // Reset input
      event.target.value = '';
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Une erreur inconnue est survenue lors de l\'upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white border-2 border-dashed border-doj-gold/50 rounded-lg text-center">
      <h3 className="text-lg font-semibold text-doj-navy mb-2">Secure Upload Portal</h3>
      <p className="text-sm text-gray-500 mb-6">Only authorized personnel may upload files to this directory.</p>
      
      {error && (
        <div className="flex items-start gap-2 text-left bg-red-50 text-red-700 p-4 rounded mb-4 text-sm border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="text-green-700 bg-green-50 p-3 rounded border border-green-200 mb-4 text-sm font-semibold">
          Fichier uploadé avec succès ! Il devrait apparaître dans la liste ci-dessous.
        </div>
      )}
      
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
