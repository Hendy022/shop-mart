import React from 'react'
import RegisterForm from './_components/RegisterForm'
import { Card } from '@/components/ui/card'

export default function Register() {
  return <div className='flex flex-col gap-6 max-w-sm   mx-auto pt-10'>

    <h1 className='text-3xl text-center font-bold'>Welcome Back !</h1>
    <Card className='p-6'>

      <RegisterForm />
    </Card>

  </div>
}
