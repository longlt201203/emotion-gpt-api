import { UserResponse } from "@modules/users/dto";
import { AccountResponse } from "./account.response";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "@db";

export class ProfileResponse {
	@ApiProperty({ type: AccountResponse })
	account: AccountResponse;

	@ApiProperty({ type: UserResponse, required: false })
	user: UserResponse | null;

	static fromEntity(entity: Profile): ProfileResponse {
		return {
			account: AccountResponse.fromEntity(entity.account),
			user: entity.user ? UserResponse.fromEntity(entity.user) : null,
		};
	}
}
