import { AccountEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateAccountRequest, LoginUsernamePasswordRequest } from "./dto";
import {
	AccountAlreadyExistedError,
	WrongUsernameOrPasswordError,
} from "./errors";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountsRepoHelper } from "@db/helpers";
import { ClsService } from "nestjs-cls";
import { EmotionGptApiClsStore } from "@utils";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountsRepository: Repository<AccountEntity>,
		private readonly accountsRepoHelper: AccountsRepoHelper,
		private readonly cls: ClsService<EmotionGptApiClsStore>,
	) {}

	getProfileByAccountId(accountId: number) {
		return this.accountsRepository.findOne({
			where: {
				id: accountId,
			},
		});
	}

	async validateBeforeCreateAccount(dto: CreateAccountRequest) {
		const entity = await this.accountsRepository.findOne({
			where: { username: dto.username },
		});
		if (entity) throw new AccountAlreadyExistedError();
	}

	async createAccount(dto: CreateAccountRequest) {
		await this.validateBeforeCreateAccount(dto);
		const salt = await bcrypt.genSalt();
		return this.accountsRepository.save({
			username: dto.username,
			password: await bcrypt.hash(dto.password, salt),
		});
	}

	async getProfileCls() {
		const accountId = this.cls.get("authAccount.id");
		return this.accountsRepoHelper.getProfile(accountId);
	}

	async issueBasicToken(dto: LoginUsernamePasswordRequest) {
		await this.loginBasic(dto.username, dto.password);
		const token = Buffer.from(`${dto.username}:${dto.password}`).toString(
			"base64",
		);
		return token;
	}

	async loginBasic(username: string, password: string) {
		const account = await this.accountsRepository.findOne({
			where: { username: username },
		});
		if (!account) throw new WrongUsernameOrPasswordError();
		const isPasswordMatch = await bcrypt.compare(password, account.password);
		if (!isPasswordMatch) throw new WrongUsernameOrPasswordError();
		return account;
	}
}
