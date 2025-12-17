import {motion} from 'framer-motion';

interface InputGroupProps {
    children: React.ReactNode;
    delay?: number;
}

function InputGroup({children, delay = 0}: InputGroupProps) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, delay}}
            className="flex justify-between items-end gap-4 items-start max-md:flex-col"
        >
            {children}
        </motion.div>
    );
}

export default InputGroup;