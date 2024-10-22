import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ChatRequest {
	@ApiProperty()
	@IsString()
	text: string;

	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	chatId?: number;
}
