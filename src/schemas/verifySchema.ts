import {z} from "zod";

export const verifySchema = z.object({
    code : z.string().min(6, "Verify code must be at least 6 characters long"),
})