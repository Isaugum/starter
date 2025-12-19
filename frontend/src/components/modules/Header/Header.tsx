import { TextAlignJustify } from 'lucide-react';
import { useNavbarModal } from '@hooks/ui/useNavbarModal.tsx';
import Button from '@components/atoms/Button/Button.tsx';
import { useLogout } from '@hooks/api/useLogout.tsx';

function Header() {
  const { openNavbarModal } = useNavbarModal();
  const logout = useLogout();

  return (
    <header className="p-4 flex justify-end">
      <Button onClick={() => logout.mutate()}>
        Logout
      </Button>
      <div className="ml-4 cursor-pointer min-md:hidden" onClick={(e) => openNavbarModal(e)}>
        <TextAlignJustify />
      </div>
    </header>
  );
}

export default Header;