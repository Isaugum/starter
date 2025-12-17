import {useModalStore} from "@store/modal.store.ts";

export function useNavbarModal() {
    const { openModal } = useModalStore();

    const openNavbarModal = (e: React.MouseEvent) => {
        e.preventDefault();
        openModal({
            title: 'Navigation',
            children: '<div>Wau</div>',
            showFooter: false,
        });
    };

    return {
        openNavbarModal,
    };
}