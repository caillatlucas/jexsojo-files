-- 1. Création de la table pour les fichiers
CREATE TABLE public.jexsojo_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Activation du Realtime pour la synchronisation instantanée
ALTER PUBLICATION supabase_realtime ADD TABLE public.jexsojo_files;

-- 3. Sécurité au niveau des lignes (RLS) pour la table
ALTER TABLE public.jexsojo_files ENABLE ROW LEVEL SECURITY;

-- Autoriser tout le monde à lire la liste des fichiers
CREATE POLICY "Lecture publique autorisée" 
ON public.jexsojo_files FOR SELECT USING (true);

-- Pour simplifier la démo, on autorise l'insertion publique (upload possible par tous).
-- Pour sécuriser, remplacez "true" par "(auth.role() = 'authenticated')"
CREATE POLICY "Insertion autorisée (Demo)" 
ON public.jexsojo_files FOR INSERT WITH CHECK (true);


-- 4. Création du bucket de stockage pour héberger les fichiers
INSERT INTO storage.buckets (id, name, public) 
VALUES ('jexsojo-bucket', 'jexsojo-bucket', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Sécurité (RLS) pour le bucket (Lecture et Upload autorisés)
CREATE POLICY "Lecture publique des fichiers" 
ON storage.objects FOR SELECT USING (bucket_id = 'jexsojo-bucket');

CREATE POLICY "Upload public des fichiers" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'jexsojo-bucket');

-- 6. Autoriser la suppression de fichiers (pour le mode Admin)
CREATE POLICY "Suppression autorisée (Demo)" 
ON public.jexsojo_files FOR DELETE USING (true);

CREATE POLICY "Suppression des fichiers Storage" 
ON storage.objects FOR DELETE USING (bucket_id = 'jexsojo-bucket');
