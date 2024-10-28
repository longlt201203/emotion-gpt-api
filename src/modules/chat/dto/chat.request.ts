import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ChatRequest {
	@ApiProperty()
	@IsString()
	text: string;

	@ApiProperty({
		type: "string",
		format: "binary",
		isArray: true,
		required: false,
	})
	files: any[];
}
