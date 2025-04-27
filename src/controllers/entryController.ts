import { Request, Response } from "express";
import { Entry } from "../models/Entry";
import { S3 } from "../config/s3";

class EntryController {
    async createEntry(req: Request, res: Response) {
        try {
            const { title, notes, timestamp } = req.body;
            const imageUrls = req.files.map((file: Express.Multer.File) => file.location); // Assuming req.files contains the uploaded files

            const newEntry = await Entry.create({
                title,
                notes,
                timestamp,
                images: imageUrls,
            });

            res.redirect("/entries");
        } catch (error) {
            console.error("Error creating entry:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    async listEntries(req: Request, res: Response) {
        try {
            const entries = await Entry.findAll();
            res.render("entries", { entries });
        } catch (error) {
            console.error("Error fetching entries:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default new EntryController();