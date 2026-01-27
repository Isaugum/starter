import { Link, useLocation } from 'react-router';
import { cn } from '@/utils/classNames.tsx';
import { ArrowRight } from 'lucide-react';

const NAV_ELEMENTS: Array<{ href: string; text: string; id: number }> = [
  {
    id: 1,
    href: '/',
    text: 'Projects',
  },
  {
    id: 2,
    href: '/',
    text: 'Entities',
  },
  {
    id: 3,
    href: '/',
    text: 'Timelines',
  },
];

function Navbar({ modal = false }: { modal?: boolean }) {
  const location = useLocation();
  return (
    <nav>
      <ul
        className={cn([
          'flex flex-col',
          !modal && 'mt-28',
        ])}
      >
        {NAV_ELEMENTS?.flatMap((element, index) => {
          const isActive = location.pathname === element.href;

          return (
            <Link
              key={`${index}-${element.href}`}
              to={element.href}
              className={cn([
                'border-b border-slate-100/20 transition-color duration-300 cursor-pointer tracking-widest p-4 text-xl flex justify-between group items-center',
                isActive ? 'bg-zinc-500/40' : 'hover:bg-zinc-500/40',
              ])}
            >
              {element.text}
              <ArrowRight
                className={
                  'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 -translate-x-4'
                }
              />
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
