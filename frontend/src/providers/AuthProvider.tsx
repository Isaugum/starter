import {useAuthStore} from "@store/auth.store.ts";

function AuthProvider({children}: { children: React.ReactNode }) {
    const {user, isAuthenticated, logout, login} = useAuthStore();

    // useEffect(() => {
    //     if (!user?.id) {
    //         setUser({...data});
    //     }
    // }, [data, setUser, user?.id]);
    //
    // if (isError) {
    //     return <div>ERROR</div>;
    // }
    //
    // if (isLoading && !data) {
    //     return <div>LOADING...</div>;
    // }

    return <>{children}</>;
}

export default AuthProvider;