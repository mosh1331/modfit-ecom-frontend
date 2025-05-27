import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/en');
  
  // This return is never reached but required by TypeScript
  return null;
}