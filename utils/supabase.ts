import { createClient } from '@supabase/supabase-js';

const bucket_name = 'landmark-bucket'; // Replace with your bucket name
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

// Create Supabase client
const supabase = createClient(url, key);

const getDateString = () => {
  const dateToday = new Date();
  const year = dateToday.getFullYear();
  const month = String(dateToday.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(dateToday.getDate()).padStart(2, '0');
  const hours = String(dateToday.getHours()).padStart(2, '0');
  const minutes = String(dateToday.getMinutes()).padStart(2, '0');
  const seconds = String(dateToday.getSeconds()).padStart(2, '0');
  const milliseconds = String(dateToday.getMilliseconds()).padStart(3, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timestamp = getDateString();
  const newName = `Abz-${timestamp}-${image.name}`;
  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(newName, image, {
      cacheControl: '3600', // Cache for 1 hour
    });

  if (!data) throw new Error(`Upload failed: ${error?.message}`);
  return supabase.storage.from(bucket_name).getPublicUrl(newName).data
    .publicUrl;
}
