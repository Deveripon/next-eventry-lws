import mongoose, { Schema } from "mongoose";

const eventShema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        details: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },

        interested_ids: {
            type: [String],
            required: false,
        },

        going_ids: {
            type: [String],
            required: false,
        },
        swags: {
            type: [String],
            required: false,
        },
    },
    { timestamps: true }
);

export const EventsModel =
    mongoose.models.events || mongoose.model("events", eventShema);
