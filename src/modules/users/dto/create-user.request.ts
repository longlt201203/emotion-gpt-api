import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	fname: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	lname: string;

	@ApiProperty({ required: false, nullable: true })
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	sname?: string | null;

	@ApiProperty()
	@IsDate()
	dob: Date;

	@ApiProperty()
	@IsString({ each: true })
	hobbies: string[];

	@ApiProperty()
	@IsString({ each: true })
	interests: string[];
}
