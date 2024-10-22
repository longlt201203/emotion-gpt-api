import { DbConstants } from "@db/db.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const { TableName, ColumnName } = DbConstants;

@Entity(TableName.HobbyEntity)
export class HobbyEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnName.HobbyEntity.id })
	id: number;

	@Column({ type: "varchar", name: ColumnName.HobbyEntity.name, unique: true })
	name: string;
}
