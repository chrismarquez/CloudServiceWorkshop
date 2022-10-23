
import * as Express from "express";

export default interface IController {
	readonly router: Express.Router;
}
