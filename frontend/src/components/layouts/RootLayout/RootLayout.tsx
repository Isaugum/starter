import { Outlet } from 'react-router';
import Sidebar from '@components/modules/Sidebar/Sidebar.tsx';
import Header from '@components/modules/Header/Header.tsx';
import Modal from "@components/modules/Modal/Modal.tsx";

function RootLayout() {
    return (
        <main className="h-screen w-screen flex bg-zinc-900 text-slate-200">
            <Sidebar />
            <div className="flex flex-col flex-1 z-10">
                <Header />
                <div className="h-full w-full overflow-y-auto p-4">
                    <div className={'mx-auto max-w-[800px]'}>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Modal />
        </main>
    );
}

export default RootLayout;