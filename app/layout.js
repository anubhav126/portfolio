import { Playfair_Display, Inter } from 'next/font/google';
import '../styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Anubhav Adhikari | Software Engineer & Full-Stack Systems Architect',
  description:
    'Software Engineer at HCLTech. Building high-scale web platforms, distributed systems, and aerospace avionics software for Airbus A350-1000F.',
  keywords: [
    'Anubhav Adhikari',
    'Software Engineer',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'Node.js',
    'Python',
    'Systems Engineering',
    'Aerospace Avionics',
    'Portfolio',
  ],
  authors: [{ name: 'Anubhav Adhikari' }],
  creator: 'Anubhav Adhikari',
  openGraph: {
    type: 'website',
    title: 'Anubhav Adhikari | Software Engineer & Systems Architect',
    description:
      'Explore projects, engineering blogs, and career milestones of Anubhav Adhikari — Software Engineer at HCLTech.',
    siteName: 'Anubhav Adhikari Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({ children }) => (
  <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
    <body className="bg-neutral-50 text-neutral-900 font-sans min-h-screen antialiased selection:bg-primary-100 selection:text-primary-700">
      {children}
    </body>
  </html>
);

export default RootLayout;
