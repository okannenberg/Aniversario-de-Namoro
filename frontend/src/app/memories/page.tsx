import { redirect } from 'next/navigation';
import { isReleased } from '@/config/site';
import { PrivateAlbum } from '@/components/PrivateAlbum';

export const dynamic = 'force-dynamic';

export default async function MemoriesPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams;
  const previewMode = preview === 'brunoalice-preview';
  if (!isReleased() && !previewMode) redirect('/');
  return <PrivateAlbum previewMode={previewMode} />;
}
