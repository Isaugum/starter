import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type MenuItemType = 'item' | 'label' | 'separator';

export interface MenuItem {
  id?: number;
  label?: string;
  onClick?: () => void;
  type: MenuItemType;
}

interface DropdownProps {
  menuItems: MenuItem[];
  align?: 'end' | 'start';
  children?: React.ReactNode;
}

export function Dropdown({ menuItems, align = 'start', children }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={'text-white mt-4'}>
        {menuItems.map((item, index) => {
          const key = `${item?.id ?? 0}-${index}`;

          switch (item.type) {
            case 'separator':
              return <DropdownMenuSeparator key={key} />;
            case 'label':
              return <DropdownMenuLabel key={key}>{item.label}</DropdownMenuLabel>;
            case 'item':
              return (
                <DropdownMenuItem key={key} onClick={item.onClick} className={'hover:bg-zinc-300/50 cursor-pointer'}>
                  {item.label}
                </DropdownMenuItem>
              );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;