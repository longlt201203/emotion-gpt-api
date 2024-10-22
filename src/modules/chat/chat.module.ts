import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ClsModule } from "nestjs-cls";
import { GptModule } from "@providers/openai/gpt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatEntity } from "@db/entities";

@Module({
	providers: [ChatService],
	controllers: [ChatController],
	imports: [
		TypeOrmModule.forFeature([ChatEntity]),
		ClsModule.forFeature(),
		GptModule,
	],
})
export class ChatModule {}
