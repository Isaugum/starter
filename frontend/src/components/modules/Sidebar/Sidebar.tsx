import Navbar from '@/components/molecules/Navbar/Navbar.tsx';
import { Routes } from '@types/enums/Routes.enum.ts';
import { useNavigate } from 'react-router';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <section
      className={
        'flex flex-col z-10 shadow-lg max-md:hidden'
      }
    >
      <h3 className={'text-2xl p-4 cursor-pointer'}
          onClick={() => navigate(Routes.HOME)}
      >
        Home
      </h3>
      <Navbar />
    </section>
  );
}

export default Sidebar;