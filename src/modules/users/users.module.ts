import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, UserHobbyEntity, UserInterestsEntity } from "@db/entities";
import { ClsModule } from "nestjs-cls";

@Module({
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			UserHobbyEntity,
			UserInterestsEntity,
		]),
		ClsModule.forFeature(),
	],
})
export class UsersModule {}
