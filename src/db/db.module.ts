import { Global, Module, Provider } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { datasource } from "./datasource";
import {
	AccountEntity,
	ChatEntity,
	UserEntity,
	UserHobbyEntity,
	UserInterestsEntity,
} from "./entities";
import { AccountsRepoHelper, UsersRepoHelper } from "./helpers";
import { addTransactionalDataSource } from "typeorm-transactional";

const repoHelpers: Provider[] = [AccountsRepoHelper, UsersRepoHelper];

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => datasource.options,
			dataSourceFactory: async () => addTransactionalDataSource(datasource),
		}),
		TypeOrmModule.forFeature([
			AccountEntity,
			UserEntity,
			UserHobbyEntity,
			UserInterestsEntity,
			ChatEntity,
		]),
	],
	providers: [...repoHelpers],
	exports: [...repoHelpers],
})
export class DbModule {}
