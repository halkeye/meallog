import { Request, Response } from "express";

class IndexController {
    public static home(req: Request, res: Response): void {
        res.render("form", {
            title: "Create Entry",
        });
    }

    public static about(req: Request, res: Response): void {
        res.render("about", {
            title: "About Us",
        });
    }
}

export default IndexController;