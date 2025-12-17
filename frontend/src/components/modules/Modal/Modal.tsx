import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '@components/atoms/Button/Button.tsx';
import {useModalStore} from "@store/modal.store.ts";

export default function Modal() {
    const { modal } = useModalStore();
    if (!modal.open) return null;

    const confirmAction = () => {
        modal.onConfirm();
        modal.onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-zinc-700/50"
            >
                <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-700/50">
                    <h2 className="text-lg font-semibold text-white">{modal.title}</h2>
                    <button
                        onClick={modal.onClose}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 text-zinc-200">{modal.children}</div>

                <>
                    {modal.showFooter && (
                        <div className="flex justify-end gap-3 px-5 py-4 border-t border-zinc-700/50">
                            <Button onClick={modal.onClose}>
                                {modal.cancelText}
                            </Button>
                            <Button onClick={() => confirmAction()}>{modal.confirmText}</Button>
                        </div>
                    )}
                </>
            </motion.div>
        </div>
    );
}
