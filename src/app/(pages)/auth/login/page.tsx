
//auth/login/page.tsx

import React from 'react'
import LoginForm from './_components/LoginForm'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Login() {
  return <div className='flex flex-col gap-6 max-w-sm   mx-auto pt-10'>

    <h1 className='text-3xl text-center font-bold'>Welcome Back !</h1>
    <Card className='p-6'>

      <LoginForm />
    </Card>

  <p>If you don't have account, please <Link className='text-blue-600 underline' href={'/auth/register'}>SignUp</Link> Now</p>
    
  </div>
}
