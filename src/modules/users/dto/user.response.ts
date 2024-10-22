import { UserEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	fname: string;

	@ApiProperty()
	lname: string;

	@ApiProperty({ required: false })
	sname: string | null;

	@ApiProperty()
	dob: Date;

	@ApiProperty({ isArray: true })
	hobbies: string[];

	@ApiProperty({ isArray: true })
	interests: string[];

	static fromEntity(entity: UserEntity): UserResponse {
		return {
			id: entity.id,
			fname: entity.fname,
			lname: entity.lname,
			sname: entity.sname,
			dob: entity.dob,
			hobbies: entity.hobbies
				? entity.hobbies.map((item) => item.hobbyName)
				: [],
			interests: entity.interests
				? entity.interests.map((item) => item.interestsName)
				: [],
		};
	}
}
