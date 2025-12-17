import { TextAlignJustify } from 'lucide-react';
import {useNavbarModal} from "@hooks/ui/useNavbarModal.tsx";

function Header() {
    const { openNavbarModal } = useNavbarModal();

    return (
        <header className="p-4 flex justify-end">
            <div className="ml-4 cursor-pointer min-md:hidden" onClick={(e) => openNavbarModal(e)}>
                <TextAlignJustify />
            </div>
        </header>
    );
}

export default Header;