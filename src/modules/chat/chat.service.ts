import { Injectable } from "@nestjs/common";
import { GptService } from "@providers/openai/gpt";
import { EmotionGptApiClsStore } from "@utils";
import { ClsService } from "nestjs-cls";
import { ChatRequest } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatEntity } from "@db/entities";
import { Repository } from "typeorm";
import { ChatLog } from "@providers/openai/gpt/types";
import { ChatNotFoundError } from "./errors";

@Injectable()
export class ChatService {
	constructor(
		private readonly cls: ClsService<EmotionGptApiClsStore>,
		private readonly gptService: GptService,
		@InjectRepository(ChatEntity)
		private readonly chatRepository: Repository<ChatEntity>,
	) {}

	async test() {
		const result = await this.gptService.sayHi();
		return result.choices[0].message.content;
	}

	async testJson() {
		const result = await this.gptService.testJson();
		return result.choices[0].message.content;
	}

	async analyzeChat(chatId: number) {
		const chat = await this.getOneOrFail(chatId);
		const logs = chat.logs as ChatLog[];
		const result = await this.gptService.analyze(logs);
		return JSON.parse(result.choices[0].message.content);
	}

	async createChat() {
		const user = this.cls.get("authUser");
		return await this.chatRepository.save({
			userId: user.id,
			logs: [],
		});
	}

	async getOne(chatId: number) {
		const userId = this.cls.get("authUser.id");
		return await this.chatRepository.findOne({
			where: {
				userId: userId,
				id: chatId,
			},
		});
	}

	async getOneOrFail(chatId: number) {
		const chat = await this.getOne(chatId);
		if (!chat) throw new ChatNotFoundError();
		return chat;
	}

	async get() {
		const userId = this.cls.get("authUser.id");
		const chats = await this.chatRepository.find({
			where: { userId: userId },
			select: ["id", "createdAt", "updatedAt"],
		});
		return chats;
	}

	async chat(chatId: number, dto: ChatRequest) {
		let chat: ChatEntity = await this.getOneOrFail(chatId);
		const logs = chat.logs as ChatLog[];
		const result = await this.gptService.chat(dto.text, logs);
		const message = result.choices[0].message.content;
		logs.push({
			role: "user",
			message: dto.text,
		});
		logs.push({
			role: "assistant",
			message: message,
		});
		chat = await this.chatRepository.save({
			...chat,
			logs: logs,
			updatedAt: new Date(),
		});
		return chat;
	}
}
