import { Inter, Roboto, Montserrat } from 'next/font/google';
import { Providers } from '@/providers/theme';
import { Topbar } from '@/components/ui/top-bar/top-bar';
import { Footer } from '@/components/ui/footer/footer';
import './globals.css';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['700'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${roboto.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head></head>
      <body className="min-h-full flex flex-col font-roboto bg-background text-foreground relative">
        <div className="absolute inset-0 z-0 h-141 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#121113]/60 z-10" />
          <Image
            width={0}
            height={0}
            loading="eager"
            src="/background.svg"
            alt="Background"
            className="w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background z-20" />
        </div>

        <Providers>
          <Topbar session={session} />
          <main className="relative z-30 flex-1 flex flex-col items-center justify-center">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
