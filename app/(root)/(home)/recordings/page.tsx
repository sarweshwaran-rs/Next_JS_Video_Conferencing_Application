import React from 'react'
import CallList from '@/components/ui/CallList'

const Recordings = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className="text-3xl font-bold">
      <CallList type='recordings' />
    </h1>
  </section>
  )
}

export default Recordings