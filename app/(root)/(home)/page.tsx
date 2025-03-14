'use client'
import MeetingList from '@/components/ui/MeetingList';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [currentTime, setCurrrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrrentTime(new Date());
    },1000);
    return () => clearInterval(interval);
  }, []);
  //Formatting the Time & Date
  const formattedTime = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12:true});
  const formaattedDate = currentTime.toLocaleDateString('en-US', {weekday: 'long', month:'long', day: 'numeric', year: 'numeric'});

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className= "h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
          <div className="flex flex-col gap-5">
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {formattedTime}
            </h1>
            <p className='text-lg font-medium text-sky-2 lg:text-2xl'>{formaattedDate}</p>
          </div>
        </div>
      </div>

      <MeetingList />
    </section>
  )
}

export default Home