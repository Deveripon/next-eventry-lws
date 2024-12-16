"use server";
import { connectMongoDB } from "@/dbConnection/dbConnection";
import {
    createUser,
    findUserByCredentials,
    getEventById,
    toggleInterest,
    updateGoing,
} from "@/queries/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import EmailTemplate from "../_components/payment/EmailTemplate";

export async function registerUser(formData) {
    const userObj = Object.fromEntries(formData);
    await connectMongoDB();
    try {
        await createUser(userObj);
    } catch (error) {
        console.log(error);
        throw new Error("User creation failed.");
    }
    redirect("/auth/login");
}

export async function loginUser(formData) {
    try {
        const credentials = {};
        credentials.email = formData.get("email");
        credentials.password = formData.get("password");
        const foundUser = await findUserByCredentials(credentials);
        return foundUser;
    } catch (error) {
        throw error;
    }
}

export async function updateInterestToEvent(userId, eventId) {
    try {
        await toggleInterest(userId, eventId);
    } catch (error) {
        throw error;
    }
    revalidatePath("/");
}

export async function updateGoingToEvent(user, eventId) {
    try {
        await updateGoing(user?.id, eventId);
        await sendEmail(user, eventId);
    } catch (error) {
        throw error;
    }
    revalidatePath("/");
    redirect("/");
}

export async function sendEmail(user, eventId) {
    try {
        const event = await getEventById(eventId);
        const resend = new Resend(process.env.EVENTRY_MAIL_API);
        const message = `Dear ${user?.name} you have been successfully registerd for the event ${event?.name}. Please carray this email and your ofiicial id to the venue. we are exited to have you here.`;
        const send = await resend.emails.send({
            from: "devripon <onboarding@resend.dev>",
            to: user?.email,
            subject: "Successfully registerd for the event",
            react: EmailTemplate({ message }),
        });
    } catch (error) {
        throw error;
    }
}
