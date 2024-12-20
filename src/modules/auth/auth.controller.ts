import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SkipAuth } from "./skip-auth.decorator";
import {
	AccountResponse,
	CreateAccountRequest,
	LoginBasicResponse,
	LoginUsernamePasswordRequest,
	ProfileResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("create-account")
	@SkipAuth()
	@SwaggerApiResponse(AccountResponse)
	async createAccount(@Body() dto: CreateAccountRequest) {
		const data = await this.authService.createAccount(dto);
		return new ApiResponseDto(
			AccountResponse.fromEntity(data),
			null,
			"Success!",
		);
	}

	@Post("login-basic")
	@SkipAuth()
	@SwaggerApiResponse(LoginBasicResponse)
	async loginBasic(@Body() dto: LoginUsernamePasswordRequest) {
		const token = await this.authService.issueBasicToken(dto);
		return new ApiResponseDto({ token }, null, "Success!");
	}

	@Get("fake-login")
	@SkipAuth()
	fakeLogin(@Res() res: Response, @Query("accountId") accountId: string) {
		res.cookie("accountId", Number(accountId));
		return res.redirect("/api/docs");
	}

	@Get("profile")
	@ApiBasicAuth()
	@ApiBearerAuth()
	@SwaggerApiResponse(ProfileResponse)
	async getProfile() {
		const data = await this.authService.getProfileCls();
		return new ApiResponseDto(
			ProfileResponse.fromEntity(data),
			null,
			"Success!",
		);
	}
}
