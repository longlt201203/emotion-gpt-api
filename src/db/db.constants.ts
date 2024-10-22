export const DbConstants = {
	TableName: {
		AccountEntity: "account",
		UserEntity: "user",
		HobbyEntity: "hobby",
		InterestsEntity: "interests",
		UserHobbyEntity: "user_hobby",
		UserInterestsEntity: "user_interests",
		ChatEntity: "chat",
	},
	ColumnName: {
		Global: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
		AccountEntity: {
			id: "account_id",
			username: "username",
			password: "password",
		},
		UserEntity: {
			id: "user_id",
			fName: "first_name",
			lname: "last_name",
			sname: "sur_name",
			dob: "date_of_birth",
		},
		HobbyEntity: {
			id: "hobby_id",
			name: "hobby_name",
		},
		InterestsEntity: {
			id: "interests_id",
			name: "interests_name",
		},
		UserHobbyEntity: {
			id: "user_hobby_id",
			hobbyName: "user_hobby_name",
		},
		UserInterestsEntity: {
			id: "user_interests_id",
			interestsName: "user_interests_name",
		},
		ChatEntity: {
			id: "chat_id",
			logs: "chat_logs",
		},
	},
} as const;
