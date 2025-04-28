import { Request, Response } from "express";

class IndexController {
    public home(req: Request, res: Response): void {
        res.render("form", {
            title: "Create Entry",
        });
    }

    public about(req: Request, res: Response): void {
        res.render("about", {
            title: "About Us",
        });
    }
}

export default IndexController;