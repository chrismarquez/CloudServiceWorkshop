import { Request, Response, NextFunction } from "express";
import * as Express from "express";
import IController from "./controllers/IController";
import { NotFoundException, HttpException } from "./exceptions/HttpExceptions";

import { HelloController } from "./controllers/HelloController";


interface Controllers {
	[route: string]: IController;
}

export default class Application {

	readonly app = Express();

	private static async initControllers(): Promise<Controllers> {
		const helloController = new HelloController();
		return {
			"/hello": helloController
		};
	}

	static async newInstance(): Promise<Application> {
		const controllers = await Application.initControllers();
		return new Application(controllers);
	}

	constructor(controllers: Controllers) {
		this.app.use(Express.json());

		this.app.use("/health", (_req: Request, res: Response, _next: NextFunction) => {
			res.status(200);
			res.send();
		});

		for (const [route, controller] of Object.entries(controllers)) {
			this.app.use(route, controller.router);
		}

		this.app.use((req, res, next) => {
			const resource = req.path;
			const error = new NotFoundException(resource);
			next(error);
		});

		this.app.use((err: HttpException, req: Request, res: Response, _: NextFunction) => {
			const statusCode = err.statusCode || 500;
			const name = err.name || "Error";
			const payload = {
				name, message: err.message
			};
			res.status(statusCode);
			res.json(payload);
		});
	}

}
