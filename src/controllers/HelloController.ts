
import * as Express from "express";
import IController from "./IController";

export class HelloController implements IController {

	readonly router = Express.Router();

	constructor() {
		this.router.get("/:user", this.getPrice.bind(this));
	}

	private async getPrice(req: Express.Request, res: Express.Response) {
		const user = req.params.user;
		const response = {
			message: `Hello there ${user}. Nice to meet you.`
		};
		res.json(response);
	}

}
