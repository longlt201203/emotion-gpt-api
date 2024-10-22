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

@Entity(TableName.UserInterestsEntity)
export class UserInterestsEntity {
	@PrimaryGeneratedColumn("increment", {
		name: ColumnName.UserInterestsEntity.id,
	})
	id: number;

	@Column({
		type: "varchar",
		name: ColumnName.UserInterestsEntity.interestsName,
	})
	interestsName: string;

	@Column({ type: "int", name: ColumnName.UserEntity.id })
	userId: number;

	@ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
	@JoinColumn({ name: ColumnName.UserEntity.id })
	user: UserEntity;
}
