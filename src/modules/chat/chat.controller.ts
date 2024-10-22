import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ChatRequest, ChatResponse } from "./dto";

@Controller("chat")
@ApiTags("chat")
@ApiBasicAuth()
@ApiBearerAuth()
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	@SwaggerApiResponse(ChatResponse)
	async chat(@Body() dto: ChatRequest) {
		const data = await this.chatService.chat(dto);
		return new ApiResponseDto(ChatResponse.fromEntity(data), null, "Success!");
	}

	@Get("analyze/:chatId")
	async analyze(@Param("chatId") chatId: string) {
		const data = await this.chatService.analyzeChat(+chatId);
		return new ApiResponseDto(data, null, "Success!");
	}

	@Get("test")
	async test() {
		const data = await this.chatService.test();
		return new ApiResponseDto(data, null, "Success!");
	}

	@Get("test-json")
	async testJson() {
		const data = await this.chatService.testJson();
		return new ApiResponseDto(data, null, "Success!");
	}

	@Get(":chatId")
	@SwaggerApiResponse(ChatResponse)
	async getChat(@Param("chatId") chatId: string) {
		const data = await this.chatService.getOneOrFail(+chatId);
		return new ApiResponseDto(ChatResponse.fromEntity(data), null, "Success!");
	}

	@Get()
	@SwaggerApiResponse(ChatResponse, { isArray: true })
	async get() {
		const data = await this.chatService.get();
		return new ApiResponseDto(
			ChatResponse.fromEntities(data),
			null,
			"Success!",
		);
	}
}
