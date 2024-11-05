import { config } from "dotenv";

config();

export const Env = {
	LISTEN_PORT: parseInt(process.env.LISTEN_PORT || "3000"),

	DB_HOST: process.env.DB_HOST || "localhost",
	DB_PORT: parseInt(process.env.DB_PORT || ""),
	DB_NAME: process.env.DB_NAME || "",
	DB_USER: process.env.DB_USER || "",
	DB_PASS: process.env.DB_PASS || "",

	ENABLE_SWAGGER: (process.env.ENABLE_SWAGGER || "false") == "true",

	OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY || "",

	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
	GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || "",

	AT_SECRET: process.env.AT_SECRET || "",
	AT_EXPIRES_IN: process.env.AT_EXPIRES_IN || "",
	RT_SECRET: process.env.RT_SECRET || "",
	RT_EXPIRES_IN: process.env.RT_EXPIRES_IN || "",
} as const;

console.log(Env);
