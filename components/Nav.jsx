"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';


const Nav = () => {

    var isUserLoggedIn = true;

    const {data: session} = useSession();

    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
            console.log('Providers set up');
        }

        setUpProviders()
      
    }, [])
    


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link className='flex gap-2 flex-center' href='/'>
            <Image src='/assets/images/logo.svg' alt='Promptopia Logo' width={30} height={30} className='object-contain' />
            <p className='logo_text'>Promptopia</p>
        </Link>


        {/* {alert(providers)} */}
    {/* Desktop Navigation */}
        <div className='chikh chikha'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'> 
                    <Link href='/create-post' className='black_btn'>Create Post</Link>
                    <button type='Button' onClick={signOut} className='outline_btn'>Sign Out</button>
                    <Link href='/profile' >
                        <Image src={session?.user.image}
                        alt='Profile' width={37} height={37}
                        className='rounded-full' 
                        /> 
                    </Link>
                </div>
            ) : (
                <>
                {
                  providers && Object.values(providers).map(provider => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign in with {provider.name}</button>
                ))}
                </>
            )}
        </div>

    {/* Mobile Navigation */}

        <div className='flex sm:hidden relative'>
            {session?.user ? (
            <div>
                <Image src={session?.user.image} 
                        alt='Profile' width={37} height={37}
                        className='rounded-full' 
                        onClick={() => setToggleDropDown((prev) => !prev)}
                        />

                        {toggleDropDown && (
                            <div className='dropdown'>
                                <Link className='dropdown_link'
                                    href='/profile'
                                    onClick={() => setToggleDropDown(false)}
                                >My Profile</Link>
                                <Link className='dropdown_link'
                                    href='/create-post'
                                    onClick={() => setToggleDropDown(false)}
                                >Create Prompt</Link>
                                <button type='button' onClick={() => {setToggleDropDown(false); signOut();}} className='mt-5 w-full black_btn'>Sign Out</button>
                            </div>
                        )}
            </div>) 
            : (
                <>
                {
                  providers && Object.values(providers).map(provider => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign in with {provider.name}</button>
                ))}
                </>
            )}
        </div>


    </nav>
  )
}

export default Nav