import { Poppins } from 'next/font/google'
import '../styles/globals.css'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const RootLayout = ({ children }) =>{
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
export default RootLayout