"@ts-nocheck"
"use client";

import { useEffect, useState } from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from '../Loader';
import { useToast } from '@/hooks/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const router = useRouter();
    const { endedCalls, upComingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const { toast } = useToast();

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upComingCalls;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(
                    callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
                );

                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings);

                setRecordings(recordings);
            } catch (error) {
                toast({ title: 'Error fetching recordings' });
            }
        };

        if (type === 'recordings') {
            fetchRecordings();
        }
    }, [type, callRecordings, toast]);

    if (isLoading) return <Loader />;

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording) => {
                    if (type === 'recordings') {
                        const rec = meeting as CallRecording;
                        return (
                            <MeetingCard
                                key={rec.filename}
                                icon={'/icons/recordings.svg'}
                                title={rec.filename.substring(0, 20) || 'No filename'}
                                date={new Date(rec.start_time).toLocaleString()}
                                isPreviousMeeting={false}
                                buttonIcon1={'/icons/play.svg'}
                                buttonText={'Play'}
                                handleClick={() => router.push(rec.url)}
                                link={rec.url}
                            />
                        );
                    } else {
                        const call = meeting as Call;
                        return (
                            <MeetingCard
                                key={call.id}
                                icon={type === 'ended' ? '/icons/previous.svg' : '/icons/upcoming.svg'}
                                title={call.state.custom.description?.substring(0, 26) || 'Personal Meeting'}
                                date={call.state.startsAt?.toLocaleString()}
                                isPreviousMeeting={type === 'ended'}
                                buttonText={type === 'ended' ? 'Details' : 'Start'}
                                handleClick={() => router.push(`/meeting/${call.id}`)}
                                link={`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`}
                            />
                        );
                    }
                })
            ) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
};

export default CallList;