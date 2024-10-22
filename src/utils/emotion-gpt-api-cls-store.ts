import { AccountEntity, UserEntity } from "@db/entities";
import { ClsStore } from "nestjs-cls";

export interface EmotionGptApiClsStore extends ClsStore {
	authAccount: AccountEntity | null;
	authUser: UserEntity | null;
}
