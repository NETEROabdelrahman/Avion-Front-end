import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Top from '@/components/ToTop';
import Cart from '@/components/Cart';



export const metadata: Metadata = {
  title: 'Avion',
  description: 'Avion furniture store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />

      <body suppressHydrationWarning className={'relative'}>
        <Navbar />
        <Top />
        <Cart/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
