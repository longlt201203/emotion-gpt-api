import { ApiError } from "@errors";

export class InvalidAuthorizationHeaderError extends ApiError {
	constructor(detail: any = null) {
		super({
			code: "invalid_authorization_header_error",
			message: "Invalid Authorization Header!",
			detail: detail,
			status: 401,
		});
	}
}
