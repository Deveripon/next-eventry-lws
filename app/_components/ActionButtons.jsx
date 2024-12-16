"use client";
import Link from "next/link";
import { useAuth } from "../_hooks/useAuth";
import { useRouter } from "next/navigation";
import { updateInterestToEvent } from "../_actions/actions";
import { startTransition, useState, useTransition } from "react";

const ActionButtons = ({ event, fromDetailsPage }) => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const isInterestred = event?.interested_ids?.find(
        (id) => id.toString() === auth?.id
    );
    const isGoing = event?.going_ids?.find((id) => id.toString() === auth?.id);
    const [interested, setInterested] = useState(isInterestred);
    const [going, setGoing] = useState(isGoing);
    const [isPending, startTransition] = useTransition();

    async function handleInterest() {
        if (!auth) {
            router.push("/auth/login");
        } else {
            await updateInterestToEvent(auth?.id, event?.id);
            setInterested(!interested);
        }
    }

    function handleGoing() {
        if (!auth) {
            router.push("/auth/login");
        } else {
            router.push(`/payment/${event?.id}`);
        }
    }

    return (
        <div
            className={`w-full flex gap-4 mt-4 ${fromDetailsPage && "flex-1"}`}>
            {/* bg-indigo-600 indicating Active */}
            <button
                onClick={() => startTransition(() => handleInterest())}
                className={`w-full hover:bg-indigo-800
                    ${interested ? "bg-indigo-600" : "bg-[#464849]"}`}>
                Interested
            </button>
            {/* bg-green-600 indicating Active */}
            <button
                disabled={auth && going}
                onClick={handleGoing}
                className='w-full text-center'>
                Going
            </button>
        </div>
    );
};

export default ActionButtons;
