import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBasicAuth,
	ApiBearerAuth,
	ApiConsumes,
	ApiTags,
} from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ChatRequest, ChatResponse } from "./dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("chat")
@ApiTags("chat")
@ApiBasicAuth()
@ApiBearerAuth()
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	@SwaggerApiResponse(ChatResponse)
	async create() {
		const data = await this.chatService.createChat();
		return new ApiResponseDto(ChatResponse.fromEntity(data), null, "Success!");
	}

	@Put(":chatId")
	@SwaggerApiResponse(ChatResponse)
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FilesInterceptor("attactments"))
	async chat(
		@Param("chatId") chatId: string,
		@Body() dto: ChatRequest,
		@UploadedFiles() attactments: Express.Multer.File[],
	) {
		const data = await this.chatService.chat(+chatId, dto);
		return new ApiResponseDto(ChatResponse.fromEntity(data), null, "Success!");
	}

	@Get(":chatId/analyze")
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
