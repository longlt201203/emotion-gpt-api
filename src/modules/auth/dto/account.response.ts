import { AccountEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";

export class AccountResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	username: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	static fromEntity(entity: AccountEntity): AccountResponse {
		return {
			id: entity.id,
			username: entity.username,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
