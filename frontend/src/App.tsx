import NavigationProvider from "@providers/NavigationProvider.tsx";
import AuthProvider from "@providers/AuthProvider.tsx";
import QueryProvider from "@providers/QueryProvider.tsx";

function App() {
    return (
        <QueryProvider>
            <AuthProvider>
                <NavigationProvider/>
            </AuthProvider>
        </QueryProvider>
    );
}

export default App;