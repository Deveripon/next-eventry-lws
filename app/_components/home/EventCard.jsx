import Image from "next/image";
import React from "react";
import ActionButtons from "../ActionButtons";
import Link from "next/link";
import EventStructuredData from "@/app/_meta/EventStructuredData";
import { generateBlurData } from "@/utils";

const EventCard = async ({ event }) => {
    const { base64 } = await generateBlurData(event?.imageUrl);
    return (
        <div className='overflow-hidden rounded-md bg-[#242526]'>
            <EventStructuredData event={event} />
            <Image
                blurDataURL={base64}
                placeholder='blur'
                src={event?.imageUrl}
                alt='Event 1'
                className='w-full'
                height={200}
                width={400}
            />
            <div className='p-3'>
                <Link
                    href={`/details/${event?.id}`}
                    className='font-bold text-lg'>
                    {event?.name}
                </Link>
                <p className='text-[#9C9C9C] text-sm mt-1'>{event?.location}</p>
                <div className='text-[#737373] text-sm mt-1'>
                    <span>{event?.interested_ids?.length} Interested</span>
                    <span className='mx-2'> | </span>
                    <span>{event?.going_ids?.length} Going</span>
                </div>
                <ActionButtons event={event} />
            </div>
        </div>
    );
};

export default EventCard;
