import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendContactMail(
    @Body() body: { name: string; email: string; message: string },
  ) {
    const { name, email, message } = body;

    await this.emailService.sendMail(
      email,
      `Contact form: ${name}`,
      `Message from ${name} (${email}): ${message}`,
      `<h3>Message from ${name}</h3><p><b>Email:</b> ${email}</p><p>${message}</p>`,
    );

    return { success: true, message: 'Email sent successfully' };
  }
}
