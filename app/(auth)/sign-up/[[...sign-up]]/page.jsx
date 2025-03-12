import React from 'react'
import { SignUp } from '@clerk/nextjs';
//import { SignUp } from 'next-auth/react'
const SignUpPage = () => {
  return (
    <main className='flex w-full items-center justify-center h-screen'>
        <SignUp />
    </main>
  )
}

export default SignUpPage