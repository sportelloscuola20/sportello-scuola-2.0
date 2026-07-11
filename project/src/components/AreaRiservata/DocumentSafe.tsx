import { useState, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Upload, Trash2, Download, File, Image, AlertCircle, Loader2, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../foundation/AuthContext';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

interface DocFile {
  name: string;
  id: string;
  created_at: string;
  size: number;
  metadata: Record<string, unknown>;
}

export default function DocumentSafe() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: documents = [], isLoading } = useQuery<DocFile[]>({
    queryKey: ['user_documents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.storage
        .from('user-documents')
        .list(user.id, { sortBy: { column: 'created_at', order: 'desc' } });

      if (error) return [];
      return (data || []).map(f => ({
        name: f.name,
        id: f.id,
        created_at: f.created_at,
        size: f.metadata?.size || 0,
        metadata: f.metadata || {},
      }));
    },
    enabled: !!user,
  });

  const getSignedUrl = useCallback(async (fileName: string) => {
    const { data } = await supabase.storage
      .from('user-documents')
      .createSignedUrl(`${user!.id}/${fileName}`, 60 * 5);
    return data?.signedUrl || null;
  }, [user]);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `Il file "${file.name}" supera il limite di 5MB.`;
    }
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return `Il formato di "${file.name}" non è supportato. Usa PDF, JPEG o PNG.`;
    }
    return null;
  };

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    if (!user) return;
    setUploadError(null);

    for (const file of Array.from(files)) {
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        continue;
      }

      setUploading(true);
      const filePath = `${user.id}/${file.name}`;
      const { error: uploadErr } = await supabase.storage
        .from('user-documents')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadErr) {
        setUploadError(uploadErr.message);
      }
      setUploading(false);
    }

    queryClient.invalidateQueries({ queryKey: ['user_documents', user?.id] });
  }, [user, queryClient]);

  const deleteMutation = useMutation({
    mutationFn: async (fileName: string) => {
      const filePath = `${user!.id}/${fileName}`;
      await supabase.storage.from('user-documents').remove([filePath]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_documents', user?.id] });
    },
  });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }, [uploadFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  }, [uploadFiles]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const fileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText size={18} className="text-red-400" />;
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return <Image size={18} className="text-blue-400" />;
    return <File size={18} className="text-white/40" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield size={20} className="text-brand-blu" />
        <h2 className="text-lg font-bold text-white">Fascicolo Digitale</h2>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-brand-verde bg-brand-verde/10'
            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="animate-spin text-brand-blu" />
            <p className="text-sm text-white/60">Caricamento in corso...</p>
          </div>
        ) : (
          <>
            <Upload size={32} className="mx-auto mb-3 text-white/30" />
            <p className="text-sm text-white/60 font-medium">
              Trascina i file qui o clicca per caricare
            </p>
            <p className="text-xs text-white/30 mt-1">PDF, JPEG, PNG — max 5MB per file</p>
          </>
        )}
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
          <AlertCircle size={14} />
          {uploadError}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white/80">Documenti ({documents.length})</h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8 text-white/30">
            <FileText size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nessun documento caricato.</p>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition">
                {fileIcon(doc.name)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                  <p className="text-xs text-white/40">{formatSize(doc.size)}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={async () => {
                      const url = await getSignedUrl(doc.name);
                      if (url) window.open(url, '_blank');
                    }}
                    className="p-1.5 text-white/40 hover:text-brand-blu transition"
                    title="Anteprima"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(doc.name)}
                    className="p-1.5 text-white/40 hover:text-red-400 transition"
                    title="Elimina"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
