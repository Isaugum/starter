import Navbar from '@/components/molecules/Navbar/Navbar.tsx';

function Sidebar() {
    return (
        <section
            className={
                'flex flex-col z-10 shadow-lg max-md:hidden'
            }
        >
            <h3 className={'text-2xl p-4'}></h3>
            <Navbar />
        </section>
    );
}

export default Sidebar;