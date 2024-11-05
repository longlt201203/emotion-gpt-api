import { ApiProperty } from "@nestjs/swagger";

export class LoginBasicResponse {
	@ApiProperty()
	token: string;
}
