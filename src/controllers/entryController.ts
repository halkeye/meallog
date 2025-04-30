import { Request, Response } from "express";
import Entry from "../models/Entry";
import EntryImage from "../models/EntryImage";

class EntryController {
  async renderForm(_: Request, res: Response) {
    res.render("form", {
      title: "Create Entry",
    });
  }

  async createEntry(req: Request, res: Response) {
    try {
      const { title, notes, timestamp } = req.body;

      const newEntry = await Entry.create(
        {
          title,
          notes,
          timestamp,
        },
        {
          include: [
            {
              model: EntryImage,
              as: "images",
            },
          ],
        },
      );

      for (const file of req.files as Express.Multer.File[]) {
        await newEntry.createImage({
          image: file.path.replace(/^public\//, ""),
        });
      }

      res.redirect("/entries");
    } catch (error) {
      console.error("Error creating entry:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async listEntries(_: Request, res: Response) {
    try {
      const entries = await Entry.findAll({
        include: [
          {
            model: EntryImage,
            as: "images",
          },
        ],
      });
      res.render("entries", { entries });
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default EntryController;
