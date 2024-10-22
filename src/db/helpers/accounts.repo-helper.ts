import { Profile } from "@db/db.types";
import { AccountEntity, UserEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AccountsRepoHelper {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountsRepository: Repository<AccountEntity>,
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async getProfile(accountId: number): Promise<Profile> {
		const [account, user] = await Promise.all([
			this.accountsRepository.findOne({ where: { id: accountId } }),
			this.usersRepository.findOne({ where: { accountId: accountId } }),
		]);

		return {
			account: account,
			user: user,
		};
	}
}
