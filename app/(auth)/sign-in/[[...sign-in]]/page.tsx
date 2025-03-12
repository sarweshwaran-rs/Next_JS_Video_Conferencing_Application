import React from 'react'
import { SignIn } from '@clerk/nextjs';
//import { SignIn } from 'next-auth/react';

const SignInPage = () => {
  return (
    <main className='flex w-full items-center justify-center h-screen'>
        <SignIn />
    </main>
  )
}

export default SignInPage