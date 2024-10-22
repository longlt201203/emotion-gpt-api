import { ApiError } from "@errors";

export class AccountAlreadyExistedError extends ApiError {
	constructor() {
		super({
			code: "account_already_existed_err",
			detail: null,
			message: "Account already existed error!",
		});
	}
}
