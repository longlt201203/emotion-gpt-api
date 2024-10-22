import { Injectable, OnModuleInit } from "@nestjs/common";
import { Env } from "@utils";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { AnalyzeOutputSchema, ChatLog } from "./types";
import { z } from "zod";

@Injectable()
export class GptService implements OnModuleInit {
	private readonly CHAT_PROMPT =
		"You are an AI assistant designed to gather and remember user information (e.g., name, date of birth, hobbies, interests) and provide personalized suggestions based on that information. You are empathetic, engaging, and always ready to converse with the user based on their current feelings, hobbies, or interests.";

	private client: OpenAI;
	constructor() {}

	async onModuleInit() {
		this.client = new OpenAI({
			apiKey: Env.OPEN_AI_API_KEY,
		});
	}

	chat(text: string, logs: ChatLog[]) {
		return this.client.chat.completions.create({
			model: "gpt-4",
			messages: [
				{ role: "system", content: this.CHAT_PROMPT },
				...logs.map((item) => ({ role: item.role, content: item.message })),
				{ role: "user", content: text },
			],
		});
	}

	analyze(logs: ChatLog[]) {
		return this.client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You are an expert in analyzing human behavior. Analyze the user information base on the chat history.",
				},
				...logs.map((item) => ({ role: item.role, content: item.message })),
			],
			response_format: zodResponseFormat(
				AnalyzeOutputSchema,
				"AnalyzeOutputSchema",
			),
		});
	}

	sayHi() {
		return this.client.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: "user", content: [{ type: "text", text: "Hi!" }] }],
		});
	}

	testJson() {
		const zodSchema = z.object({
			name: z.string(),
			age: z.number(),
			hobbies: z.array(z.string()),
			interests: z.array(z.string()),
			personalities: z.array(z.string()),
		});

		return this.client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: "Extract information from the conversation.",
				},
				{
					role: "user",
					content:
						"Hi, My name is Long. I'm 21 years old! I like to read books and don't like people.",
				},
			],
			response_format: zodResponseFormat(zodSchema, "zodSchema"),
		});
	}
}
