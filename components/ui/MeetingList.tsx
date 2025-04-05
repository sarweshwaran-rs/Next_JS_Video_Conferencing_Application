import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from '../MeetingModal';

const MeetingList = () => {

    const router = useRouter();

    const [meetingState, setMeetingState] = useState<'isScheculeMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>()

    const createMeeting = () => {

    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start an Instant Meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schecule Meeting'
                description='Plan your Meeting'
                handleClick={() => setMeetingState('isScheculeMeeting')}
                className='bg-blue-1'
            />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Recordings'
                description='Check out your recorded Meeting'
                handleClick={() => router.push('/recordings')}
                className='bg-purple-1'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='Join Via Meeting Invitation Link'
                handleClick={() => setMeetingState('isJoinMeeting')}
                className='bg-yellow-1'
            />
            
            <MeetingModal 
                isOpen={meetingState === 'isInstantMeeting'}
                onClose = {() => setMeetingState(undefined)}
                title = "Start an Instant Meeting"
                className = "text-center"
                buttonText = "Start Meeting"
                handleClick = {createMeeting}
            />
        </section>
    )
}
    
export default MeetingList