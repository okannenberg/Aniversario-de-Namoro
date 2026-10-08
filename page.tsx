import { CountdownGate } from '@/components/CountdownGate';
import { isReleased } from '@/config/site';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <CountdownGate released={isReleased()} />;
}
