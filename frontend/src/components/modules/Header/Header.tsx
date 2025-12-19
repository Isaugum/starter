import { TextAlignJustify, User2 } from 'lucide-react';
import { useNavbarModal } from '@hooks/ui/useNavbarModal.tsx';
import { useLogout } from '@hooks/api/useLogout.tsx';
import Dropdown, { MenuItem } from '@components/atoms/Dropdown/Dropdown.tsx';


function Header() {
  const { openNavbarModal } = useNavbarModal();
  const logout = useLogout();

  const MENU: MenuItem[] = [
    { id: 1, type: 'item', label: 'Profile', onClick: () => console.log('Profile clicked') },
    { type: 'separator' },
    { id: 2, type: 'item', label: 'Logout', onClick: () => logout.mutate() },
  ];

  return (
    <header className="p-8 flex justify-end">
      <Dropdown align={'end'} menuItems={MENU}><User2 /></Dropdown>
      <div className="ml-4 cursor-pointer min-md:hidden" onClick={(e) => openNavbarModal(e)}>
        <TextAlignJustify />
      </div>
    </header>
  );
}

export default Header;