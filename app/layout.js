import { Inter } from 'next/font/google'
import '@styles/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'People management',
  description: 'manage people',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
          <div className="main">
            <div className="gradient"/>
          </div>
          <main className="app">
           {children}
          </main>
      </body>
    </html>
  )
}
