import { DbConstants } from "@db/db.constants";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserHobbyEntity } from "./user-hobby.entity";
import { UserInterestsEntity } from "./user-interests.entity";

const { TableName, ColumnName } = DbConstants;

@Entity(TableName.UserEntity)
export class UserEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnName.UserEntity.id })
	id: number;

	@Column({ type: "varchar", name: ColumnName.UserEntity.fName, length: 50 })
	fname: string;

	@Column({ type: "varchar", name: ColumnName.UserEntity.lname, length: 50 })
	lname: string;

	@Column({
		type: "varchar",
		name: ColumnName.UserEntity.sname,
		length: 50,
		nullable: true,
	})
	sname: string | null;

	@Column({ type: "datetime", name: ColumnName.UserEntity.dob })
	dob: Date;

	@Column({ type: "int", name: ColumnName.AccountEntity.id })
	accountId: number;

	@OneToMany(() => UserInterestsEntity, (interests) => interests.user)
	interests: UserInterestsEntity[];

	@OneToMany(() => UserHobbyEntity, (hobby) => hobby.user)
	hobbies: UserHobbyEntity[];
}
