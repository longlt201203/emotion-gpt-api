import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ClsService } from "nestjs-cls";
import { EmotionGptApiClsStore } from "@utils";
import { Reflector } from "@nestjs/core";
import { AuthService } from "./auth.service";
import { InvalidAuthorizationHeaderError } from "./errors";
import { UsersService } from "@modules/users";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
		private readonly cls: ClsService<EmotionGptApiClsStore>,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const skipAuth = this.reflector.getAllAndOverride<boolean>("skipAuth", [
			context.getHandler(),
			context.getClass(),
		]);
		if (skipAuth) return true;
		const request = context.switchToHttp().getRequest<Request>();
		const account = await this.getCredentials(request);
		if (!account) return false;
		this.cls.set("authAccount", account);
		const user = await this.usersService.get();
		this.cls.set("authUser", user);
		return true;
	}

	private getAuthorizationHeader(req: Request) {
		const authorization = req.headers.authorization;
		if (!authorization)
			throw new InvalidAuthorizationHeaderError(
				"Missing authorization header!",
			);
		return authorization;
	}

	private async getCredentials(req: Request) {
		const authorization = this.getAuthorizationHeader(req);
		if (authorization.startsWith("Basic ")) {
			return this.getCredentialsBasicAuth(authorization);
		} else if (authorization.startsWith("Bearer ")) {
			return this.getCredentialsBearerAuth(authorization);
		} else {
			throw new InvalidAuthorizationHeaderError(
				"Authorization scheme is not supported!",
			);
		}
	}

	private async getCredentialsBasicAuth(authorization: string) {
		let parts = authorization.split(" ");
		if (parts.length < 2)
			throw new InvalidAuthorizationHeaderError("Missing auth token!");
		const token = Buffer.from(parts[1], "base64").toString();
		parts = token.split(":");
		if (parts.length < 2)
			throw new InvalidAuthorizationHeaderError("Invalid auth token!");
		const username = parts[0];
		const password = parts[1];
		return await this.authService.loginBasic(username, password);
	}

	private async getCredentialsBearerAuth(authorization: string) {
		throw new InvalidAuthorizationHeaderError(
			"Authorization scheme is not supported!",
		);
	}
}
