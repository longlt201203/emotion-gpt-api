import { ChatEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";
import { ChatLog } from "@providers/openai/gpt/types";

export class ChatLogResponse {
	@ApiProperty()
	role: string;

	@ApiProperty()
	message: string;
}

export class ChatResponse {
	@ApiProperty()
	id: number;

	@ApiProperty({ type: ChatLogResponse, isArray: true })
	logs: ChatLogResponse[];

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	static fromEntity(entity: ChatEntity): ChatResponse {
		const logs = entity.logs ? (entity.logs as ChatLog[]) : [];
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
			logs: logs.map((item) => ({ role: item.role, message: item.message })),
		};
	}

	static fromEntities(entities: ChatEntity[]) {
		return entities.map(this.fromEntity);
	}
}
