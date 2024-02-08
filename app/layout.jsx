'use client';
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import { usePathname } from 'next/navigation';


// export const metadata = {
//     title: 'Promptopia',
//     description: 'Discover & Share AI Prompts'
// }

const RootLayout = ({children}) => {


    const pathname = usePathname();


  return (
    <html lang='en'>
        <head>
            <title>{
            pathname === '/' ? 'Promptopia' 
            : pathname === '/profile' ? 'My Profile'
            : pathname === '/update-prompt' ? 'Edit Post'
            : pathname === '/create-post' ? 'Create Post'
            : pathname === '/profile/[username]?=[id]' ? 'Profile'
            : 'Profile'
         }</title>
            <meta name='description' content='Discover & Share AI Prompts' />
            
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest"></link>

        </head>
        <body>
            <Provider>

            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
            
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout