import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "@utils";
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { initializeTransactionalContext } from "typeorm-transactional";

async function bootstrap() {
	initializeTransactionalContext();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api");
	app.enableCors({ origin: "*" });
	app.use(helmet());
	app.use(cookieParser());

	if (Env.ENABLE_SWAGGER) {
		const config = new DocumentBuilder()
			.setTitle("API Documentation")
			.setDescription("API Description")
			.setVersion("1.0")
			.addBasicAuth()
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("api/docs", app, document);
	}

	await app.listen(Env.LISTEN_PORT);
}
bootstrap();
