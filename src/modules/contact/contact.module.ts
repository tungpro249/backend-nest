import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { EmailService } from "../email/email.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    controllers: [ContactController],
    providers: [EmailService],
    exports: [EmailService]
})

export class ContactModule {}