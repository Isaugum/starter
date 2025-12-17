import { AnimatePresence, motion } from 'framer-motion';

function ErrorMessage({ text }: { text: string }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <p className="text-red-400 ml-3 text-sm mt-1">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ErrorMessage;
