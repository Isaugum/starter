import {cn} from '@/utils/classNames.tsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    modifier?: string;
}

function Button({children, className, modifier, ...props}: ButtonProps) {
    return (
        <button
            {...props}
            className={cn([
                `mt-4 min-w-[80px] backdrop-blur-xs rounded-md shadow-lg p-4 cursor-pointer flex justify-center items-center ${className || ''}`,
                modifier !== 'delete' ? 'bg-zinc-300/10' : 'bg-red-500/20',
            ])}
        >
            {children}
        </button>
    );
}

export default Button;
