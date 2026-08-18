import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'Slekco | Modern Multipurpose E-Commerce Marketplace',
  description: 'Shop curated electronics, fashion, home & living, beauty, and premium accessories with instant global shipping at Slekco.',
  keywords: 'e-commerce, electronics, fashion, home living, beauty, online store, slekco',
  openGraph: {
    title: 'Slekco E-Commerce',
    description: 'Curated premium marketplace for tech, fashion, and lifestyle.',
    url: 'https://slekco.com',
    siteName: 'Slekco',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 antialiased selection:bg-indigo-500 selection:text-white" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
