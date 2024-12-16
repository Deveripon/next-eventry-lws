import Image from "next/image";
import React from "react";
import ActionButtons from "../ActionButtons";

const HeroSection = ({ event }) => {
    return (
        <section className='container'>
            <div className='bg-gradient-to-b from-slate-200/20 to-slate-800/30'>
                <Image
                    src={event?.imageUrl}
                    alt={event?.name}
                    className='h-[450px] mx-auto'
                    width={1000}
                    height={400}
                />
            </div>
            {/* Details */}
            <div className='flex items-end'>
                <div className='flex-auto py-4'>
                    <h1 className='font-bold text-2xl'>{event?.name}</h1>
                    <p className='text-[#9C9C9C] text-base mt-1'>
                        {event?.location}
                    </p>
                    <div className='text-[#737373] text-sm mt-1'>
                        <span>{event?.interested_ids?.length} Interested</span>
                        <span className='mx-2'>|</span>
                        <span>{event?.going_ids?.length} Going</span>
                    </div>
                </div>

                <ActionButtons event={event} fromDetailsPage={true} />
            </div>
        </section>
    );
};

export default HeroSection;
