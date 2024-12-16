import EventDescription from "@/app/_components/details/EventDescription";
import HeroSection from "@/app/_components/details/HeroSection";
import Vanue from "@/app/_components/details/Vanue";
import { getEventById } from "@/queries/queries";
import React from "react";

export async function generateMetadata({ params: { id } }) {
    const event = await getEventById(id);
    return {
        title: `Eventry | ${event?.name}`,
        description: event?.details,
        opengraph: {
            images: [event?.imageUrl],
        },
    };
}

export default async function DeatailsPage({ params: { id } }) {
    const event = await getEventById(id);
    return (
        <main>
            <HeroSection event={event} />
            <section className='container'>
                <div className='grid grid-cols-5 gap-12 my-12'>
                    <EventDescription event={event} />
                    <Vanue vanue={event?.location} />
                </div>
            </section>
        </main>
    );
}
