import { ApiProperty } from "@nestjs/swagger";

export class LoginUsernamePasswordRequest {
	@ApiProperty()
	username: string;

	@ApiProperty()
	password: string;
}
