import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserRequest, UpdateUserRequest, UserResponse } from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";

@Controller("users")
@ApiTags("users")
@ApiBasicAuth()
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@SwaggerApiResponse(UserResponse)
	async create(@Body() dto: CreateUserRequest) {
		const data = await this.usersService.create(dto);
		return new ApiResponseDto(UserResponse.fromEntity(data), null, "Success!");
	}

	@Get()
	@SwaggerApiResponse(UserResponse)
	async get() {
		const data = await this.usersService.getOrFail();
		return new ApiResponseDto(UserResponse.fromEntity(data), null, "Success!");
	}

	@Put()
	@SwaggerApiResponse(UserResponse)
	async update(@Body() dto: UpdateUserRequest) {
		const data = await this.usersService.update(dto);
		return new ApiResponseDto(UserResponse.fromEntity(data), null, "Success!");
	}
}
