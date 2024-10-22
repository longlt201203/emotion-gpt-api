import { UserEntity, UserHobbyEntity, UserInterestsEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepoHelper {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
		@InjectRepository(UserHobbyEntity)
		private readonly userHobbiesRepository: Repository<UserHobbyEntity>,
		@InjectRepository(UserInterestsEntity)
		private readonly userInterestsReposiroty: Repository<UserInterestsEntity>,
	) {}

	async getByAccountId(accountId: number) {
		const user = await this.usersRepository.findOne({
			where: { accountId: accountId },
		});
		if (!user) return null;
		const [hobbies, interests] = await Promise.all([
			this.userHobbiesRepository.find({ where: { userId: user.id } }),
			this.userInterestsReposiroty.find({ where: { userId: user.id } }),
		]);
		user.hobbies = hobbies;
		user.interests = interests;
		return user;
	}
}
