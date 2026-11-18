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
  title: 'Anubhav Adhikari | Software Engineer — Java, Spring Boot, Kafka, Python RAG, Next.js',
  description:
    'Software Engineer at HCLTech with 3 years of experience building scalable event-driven systems with Java, Spring Boot, Apache Kafka, Python RAG assistants with LangChain, test automation across 1,000+ workflows, and full-stack applications with React and Next.js.',
  keywords: [
    'Anubhav Adhikari',
    'Software Engineer',
    'HCLTech',
    'Java',
    'Spring Boot',
    'Apache Kafka',
    'Python',
    'LangChain',
    'RAG',
    'Vector Database',
    'Next.js',
    'React',
    'SQL',
    'PostgreSQL',
    'Ramaiah University of Applied Sciences',
    'IEEE Xplore',
    'Portfolio',
  ],
  authors: [{ name: 'Anubhav Adhikari' }],
  creator: 'Anubhav Adhikari',
  openGraph: {
    type: 'website',
    title: 'Anubhav Adhikari | Software Engineer — Java, Spring Boot, Kafka, Python RAG, Next.js',
    description:
      'Software Engineer at HCLTech building scalable, event-driven systems using Java, Spring Boot, Apache Kafka, Python RAG assistants, and modern full-stack web applications.',
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
