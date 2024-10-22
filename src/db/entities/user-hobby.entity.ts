import { DbConstants } from "@db/db.constants";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

const { TableName, ColumnName } = DbConstants;

@Entity(TableName.UserHobbyEntity)
export class UserHobbyEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnName.UserHobbyEntity.id })
	id: number;

	@Column({ type: "varchar", name: ColumnName.UserHobbyEntity.hobbyName })
	hobbyName: string;

	@Column({ type: "int", name: ColumnName.UserEntity.id })
	userId: number;

	@ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
	@JoinColumn({ name: ColumnName.UserEntity.id })
	user: UserEntity;
}
