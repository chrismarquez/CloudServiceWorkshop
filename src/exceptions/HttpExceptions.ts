
export interface HttpException extends Error {
	statusCode: number;
}

export class NotFoundException extends Error implements HttpException {
	statusCode = 404;

	constructor(resource: string) {
		super(`Resource Not Found: ${resource}`);
	}

}