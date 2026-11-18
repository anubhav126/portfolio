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
    'Software Engineer with 3 years of experience building scalable event-driven systems with Java, Spring Boot, Apache Kafka, Python RAG assistants with LangChain, test automation across 1,000+ workflows, and full-stack applications with React and Next.js.',
  keywords: [
    'Anubhav Adhikari',
    'Software Engineer',
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
      'Software Engineer building scalable, event-driven systems using Java, Spring Boot, Apache Kafka, Python RAG assistants, and modern full-stack web applications.',
    siteName: 'Anubhav Adhikari Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({ children }) => (
  <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `,
        }}
      />
    </head>
    <body className="bg-neutral-50 text-neutral-900 dark:bg-[#090D16] dark:text-neutral-100 font-sans min-h-screen antialiased selection:bg-primary-100 selection:text-primary-700 dark:selection:bg-primary-950 dark:selection:text-primary-300 transition-colors duration-200">
      {children}
    </body>
  </html>
);

export default RootLayout;
