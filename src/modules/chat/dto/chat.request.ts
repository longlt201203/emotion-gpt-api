import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChatRequest {
	@ApiProperty()
	// @IsString()
	text: string;

	@ApiProperty({
		type: "string",
		format: "binary",
		isArray: true,
		required: false,
	})
	attactments: any[];
}
