import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
});

export const UserModel =
    mongoose.models.Users || mongoose.model("Users", userSchema);
