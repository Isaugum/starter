import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface TitleProps {
  text: string;
  subtitle?: string | React.ReactNode;
  backBtnText?: string;
  backHref?: string;
}

function Title({ text, subtitle, backBtnText, backHref }: TitleProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      className={''}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <>
        {backBtnText && backHref &&
          <div
            className={
              'flex items-center mb-2 opacity-30 cursor-pointer hover:opacity-70 transition-color duration-300'
            }
            onClick={() => navigate(backHref ?? '')}
          >
            <ArrowLeft size={20} />
            <span className="ml-2 text-lg">{backBtnText}</span>
          </div>
        }
      </>
      <div className="flex items-center justify-between">
        <h1 className={'text-3xl font-bold uppercase tracking-widest'}>{text}</h1>
        {subtitle && <span className={'opacity-80 text-lg tracking-widest'}>{subtitle}</span>}
      </div>
    </motion.div>
  );
}

export default Title;
