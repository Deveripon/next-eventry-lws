import React, { Suspense } from "react";
import Header from "./_components/home/Header";
import EventsList from "./_components/home/EventsList";
import EventCard from "./_components/home/EventCard";
import { connectMongoDB } from "@/dbConnection/dbConnection";
import { getAllEvents } from "@/queries/queries";
import { NEXT_QUERY_PARAM_PREFIX } from "next/dist/lib/constants";

export default async function HomePage({ searchParams: { query } }) {
    await connectMongoDB();
    const allEvents = await getAllEvents(query);

    return (
        <main className='py-8'>
            <section className='container'>
                <Header />
                <Suspense key={query} fallback={<h1>loading....</h1>}>
                    <EventsList>
                        {allEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </EventsList>
                </Suspense>
            </section>
        </main>
    );
}
