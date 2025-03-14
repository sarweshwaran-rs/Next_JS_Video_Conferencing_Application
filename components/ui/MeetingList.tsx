import React from 'react'
import Image from 'next/image'

const MeetingList = () => {
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <div className = 'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer'
            onClick={()=>{}}
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px] items-center'>
                <Image src = '/icons/add-meeting.svg' alt="Metting" width={27} height={27} />
            </div>
            <div className='flex flex-col gap-2'>
                <h1  className='text-2xl font-bold'>New Meeting</h1>
                <p className='text-lg font-normal'>Start an Instant Meeting</p>
            </div>
        </div>

        <div className='bg-purple-1'>
            Box 2
        </div>

        <div className='bg-yellow-1'>
            Box 3
        </div>

        <div className='bg-sky-4'>
            Box 4       
        </div>

    </section>
  )
}

export default MeetingList