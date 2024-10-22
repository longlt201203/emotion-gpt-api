import { DbConstants } from "@db/db.constants";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

const { TableName, ColumnName } = DbConstants;

@Entity(TableName.ChatEntity)
export class ChatEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnName.ChatEntity.id })
	id: number;

	@Column({ type: "json", name: ColumnName.ChatEntity.logs })
	logs: object;

	@Column({ type: "int", name: ColumnName.UserEntity.id })
	userId: number;

	@CreateDateColumn({ name: ColumnName.Global.createdAt })
	createdAt: Date;

	@CreateDateColumn({ name: ColumnName.Global.updatedAt })
	updatedAt: Date;
}
