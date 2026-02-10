import { getSupabaseClient } from '@/lib/supabaseClient';

export const viewDocument = (filePath: string) => {
  const supabase=getSupabaseClient();
  const { data } =  supabase.storage
    .from("documents")
    .getPublicUrl(filePath);
  window.open(data.publicUrl, "_blank");
};

export const downloadDocument = async (
  filePath: string,
  fileName: string
) => {
    const supabase=getSupabaseClient();
  const { data, error } = await supabase.storage
    .from("documents")
    .download(filePath);

  if (error) throw error;

  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

export const shareDocument = (filePath: string) => {
    const supabase=getSupabaseClient();
    const { data} = supabase.storage
    .from("documents")
    .getPublicUrl(filePath);
    
   navigator.clipboard.writeText(data.publicUrl);
};
