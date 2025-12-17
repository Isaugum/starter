import { create } from 'zustand';
import { type ReactNode } from 'react';

interface ModalState {
    open: boolean;
    title?: string;
    children?: ReactNode;
    showFooter?: boolean;
    confirmText?: string;
    cancelText?: string;
    onClose: () => void;
    onConfirm: () => void;
}

interface ModalStore {
    modal: ModalState;
    openModal: (update?: Partial<Omit<ModalState, 'open' | 'onClose'>>) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
    modal: {
        open: false,
        title: 'Modal',
        children: null,
        showFooter: true,
        confirmText: 'Save',
        cancelText: 'Cancel',
        onClose: () => get().closeModal(),
        onConfirm: () => {},
    },

    openModal: (update) =>
        set((state) => ({
            modal: {
                ...state.modal,
                ...update,
                open: true,
                onClose: () => get().closeModal(),
                onConfirm: () => {
                    update?.onConfirm?.();
                    get().closeModal();
                },
            },
        })),

    closeModal: () =>
        set(() => ({
            modal: {
                open: false,
                title: 'Modal',
                children: null,
                showFooter: true,
                confirmText: 'Save',
                cancelText: 'Cancel',
                onClose: () => get().closeModal(),
                onConfirm: () => {},
            },
        })),
}));
