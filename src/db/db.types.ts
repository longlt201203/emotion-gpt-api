import { AccountEntity, UserEntity } from "./entities";

export class Profile {
	account: AccountEntity;
	user: UserEntity | null;
}
