import { EventsModel } from "@/models/event-models";
import { UserModel } from "@/models/user-models";
import { remove_IdFromArrays, remove_idFromObject } from "@/utils";
import mongoose, { Mongoose } from "mongoose";

export async function getAllEvents(query) {
    if (!query) {
        const data = await EventsModel.find().lean();
        const allEvents = remove_IdFromArrays(data);
        return allEvents;
    }
    {
        const regex = new RegExp(query, "ig");
        const data = await EventsModel.find({ name: { $regex: regex } }).lean();
        return remove_IdFromArrays(data);
    }
}

export async function getEventById(id) {
    const data = await EventsModel.findById(id).lean();
    return remove_idFromObject(data);
}

export async function createUser(userObject) {
    return await UserModel.create(userObject);
}

export async function findUserByCredentials(credentials) {
    const user = await UserModel.findOne(credentials).lean();
    if (user) {
        return remove_idFromObject(user);
    }
    return null;
}

export async function toggleInterest(userId, eventId) {
    const event = await EventsModel.findById(eventId);
    if (event) {
        const isUserInterested = event?.interested_ids?.find(
            (id) => id.toString() === userId
        );
        if (!isUserInterested) {
            event?.interested_ids?.push(
                new mongoose.Types.ObjectId(`${userId}`)
            );
        } else {
            event?.interested_ids?.pull(
                new mongoose.Types.ObjectId(`${userId}`)
            );
        }
    }
    event.save();
}

export async function updateGoing(userId, eventId) {
    const event = await EventsModel.findById(eventId);
    if (event) {
        event?.going_ids?.push(new mongoose.Types.ObjectId(`${userId}`));
    }
    event.save();
}
