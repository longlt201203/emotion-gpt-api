import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "@db/entities";
import { ClsModule } from "nestjs-cls";

@Module({
	providers: [AuthService],
	controllers: [AuthController],
	imports: [TypeOrmModule.forFeature([AccountEntity]), ClsModule.forFeature()],
	exports: [AuthService],
})
export class AuthModule {}
