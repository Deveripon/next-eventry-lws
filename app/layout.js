import Navbar from "./_components/Navbar";
import "./globals.css";
import AuthProvider from "./_providers/AuthProvider";
export const metadata = {
    title: "Eventry | Home",
    description: "One Platform to find all events accross the world",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
