import { Module } from "@nestjs/common";
import { GoogleOAuth2Service } from "./google-oauth2.service";
import { HttpModule } from "@nestjs/axios";

@Module({
	providers: [GoogleOAuth2Service],
	exports: [GoogleOAuth2Service],
	imports: [HttpModule.register({})],
})
export class GoogleOAuth2Module {}
