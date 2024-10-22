import { ApiError } from "@errors";

export class UserAlreadyExistedError extends ApiError {
	constructor() {
		super({
			code: "user_already_existed_err",
			message: "User already existed!",
			detail: null,
		});
	}
}
