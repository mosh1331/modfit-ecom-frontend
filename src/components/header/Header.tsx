'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const Header=()=> {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    // Remove current locale from pathname
    const newPath = pathname.replace(/^\/(en|ml)/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => changeLanguage('en')}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('ml')}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        മലയാളം
      </button>
    </div>
  );
}

export default Header;