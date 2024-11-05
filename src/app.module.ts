import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import {
	EmotionGptApiClsStore,
	MyExceptionFilter,
	ValidationPipe,
} from "@utils";
import { DbModule } from "@db";
import { UsersModule } from "@modules/users";
import { AuthGuard, AuthModule } from "@modules/auth";
import { ClsModule, ClsService } from "nestjs-cls";
import { ChatModule } from "@modules/chat";

@Module({
	imports: [
		DbModule,
		ClsModule.forRoot({
			middleware: {
				mount: true,
				setup: (cls: ClsService<EmotionGptApiClsStore>) => {
					cls.set("authAccount", null);
				},
			},
		}),
		UsersModule,
		AuthModule,
		ChatModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
