import { DbConstants } from "@db/db.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const { TableName, ColumnName } = DbConstants;

@Entity(TableName.InterestsEntity)
export class InterestsEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnName.InterestsEntity.id })
	id: number;

	@Column({
		type: "varchar",
		name: ColumnName.InterestsEntity.name,
		unique: true,
	})
	name: string;
}
