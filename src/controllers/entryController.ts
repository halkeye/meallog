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
        include: ["images"],
        offset: 0,
        limit: 20,
      });
      const imagesByEntryId = await EntryImage.findAll({
        raw: true,
        attributes: {
          include: ["entryId"],
        },
        where: {
          entryId: entries.map((e) => e.id),
        },
      }).then((images) => {
        return images.reduce(function (acc, i) {
          acc.set(i.entryId, [...(acc.get(i.entryId) || []), i.image]);
          return acc;
        }, new Map<number, string[]>());
      });
      res.render("entries", {
        entries: entries.map((e) => {
          const json = e.toJSON() as Record<string, unknown>;
          json.images = imagesByEntryId.get(e.id) || [];
          return json;
        }),
      });
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async listEntriesJson(_: Request, res: Response) {
    try {
      const entries = await Entry.findAll({
        include: ["images"],
        offset: 0,
        limit: 20,
      });
      const imagesByEntryId = await EntryImage.findAll({
        raw: true,
        attributes: {
          include: ["entryId"],
        },
        where: {
          entryId: entries.map((e) => e.id),
        },
      }).then((images) => {
        return images.reduce(function (acc, i) {
          acc.set(i.entryId, [...(acc.get(i.entryId) || []), i.image]);
          return acc;
        }, new Map<number, string[]>());
      });
      res.json(
        entries.map((e) => {
          const json = e.toJSON() as Record<string, unknown>;
          json.images = imagesByEntryId.get(e.id) || [];
          return json;
        }),
      );
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default EntryController;
