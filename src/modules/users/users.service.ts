import { UserEntity, UserHobbyEntity, UserInterestsEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserRequest, UpdateUserRequest } from "./dto";
import { ClsService } from "nestjs-cls";
import { EmotionGptApiClsStore } from "@utils";
import { UserAlreadyExistedError, UserNotFoundError } from "./errors";
import { Transactional } from "typeorm-transactional";
import { UsersRepoHelper } from "@db/helpers";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
		@InjectRepository(UserHobbyEntity)
		private readonly userHobbiesRepository: Repository<UserHobbyEntity>,
		@InjectRepository(UserInterestsEntity)
		private readonly userInterestsReposiroty: Repository<UserInterestsEntity>,
		private readonly cls: ClsService<EmotionGptApiClsStore>,
		private readonly usersRepoHelper: UsersRepoHelper,
	) {}

	async get() {
		const accountId = this.cls.get("authAccount.id");
		const user = await this.usersRepoHelper.getByAccountId(accountId);
		return user;
	}

	@Transactional()
	async create(dto: CreateUserRequest) {
		let user = await this.get();
		if (user) throw new UserAlreadyExistedError();
		const accountId = this.cls.get("authAccount.id");
		user = await this.usersRepository.save({
			fname: dto.fname,
			lname: dto.lname,
			sname: dto.sname,
			dob: dto.dob,
			accountId: accountId,
		});
		const [hobbies, interests] = await Promise.all([
			this.userHobbiesRepository.save(
				dto.hobbies.map((item) => ({
					hobbyName: item,
					userId: user.id,
				})),
			),
			this.userInterestsReposiroty.save(
				dto.interests.map((item) => ({
					interestsName: item,
					userId: user.id,
				})),
			),
		]);
		user.hobbies = hobbies;
		user.interests = interests;
		return user;
	}

	async getOrFail() {
		const user = await this.get();
		if (!user) throw new UserNotFoundError();
		return user;
	}

	@Transactional()
	async update(dto: UpdateUserRequest) {
		let user = await this.getOrFail();
		user = await this.usersRepository.save({
			...user,
			fname: dto.fname,
			lname: dto.lname,
			dob: dto.dob,
			sname: dto.sname,
		});
		await Promise.all([
			this.userHobbiesRepository.delete({ userId: user.id }),
			this.userInterestsReposiroty.delete({ userId: user.id }),
		]);
		const [hobbies, interests] = await Promise.all([
			this.userHobbiesRepository.save(
				dto.hobbies.map((item) => ({
					hobbyName: item,
					userId: user.id,
				})),
			),
			this.userInterestsReposiroty.save(
				dto.interests.map((item) => ({
					interestsName: item,
					userId: user.id,
				})),
			),
		]);
		user.hobbies = hobbies;
		user.interests = interests;
		return user;
	}
}
