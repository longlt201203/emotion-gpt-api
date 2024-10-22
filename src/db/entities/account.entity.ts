import { DbConstants } from "@db/db.constants";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

const { TableName, ColumnName } = DbConstants;

@Entity(TableName.AccountEntity)
export class AccountEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnName.AccountEntity.id })
	id: number;

	@Column({ type: "varchar", name: ColumnName.AccountEntity.username })
	username: string;

	@Column({ type: "varchar", name: ColumnName.AccountEntity.password })
	password: string;

	@CreateDateColumn({ type: "datetime", name: ColumnName.Global.createdAt })
	createdAt: Date;

	@CreateDateColumn({ type: "datetime", name: ColumnName.Global.updatedAt })
	updatedAt: Date;
}
