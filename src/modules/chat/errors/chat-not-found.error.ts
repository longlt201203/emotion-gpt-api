import { ApiError } from "@errors";

export class ChatNotFoundError extends ApiError {
	constructor() {
		super({
			code: "chat_not_found_err",
			message: "Chat not found!",
			detail: null,
			status: 404,
		});
	}
}
