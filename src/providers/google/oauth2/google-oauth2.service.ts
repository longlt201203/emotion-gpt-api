import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleOAuth2Service {
	constructor(private readonly httpService: HttpService) {}
}
