import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');

@Injectable()
export class MailService {
  constructor(private config: ConfigService) {}

  async renderFile(
    user: string,
    receiver: string,
    content: string,
    template: string,
  ) {
    return new Promise<string>((resolve, reject) => {
      return ejs.renderFile(
        join(__dirname, './templates/' + template + '.ejs'),
        { user, receiver, content },
        (err, data) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  async sendMailAsync(receiver: string, subject: string, data: string) {
    const origin = this.config.get('EMAIL_ORIGIN');
    const settings = {
      service: this.config.get('SMTP_SERVICE'),
      auth: {
        user: this.config.get('SMTP_USERNAME'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    };

    const mailOptions = {
      from: origin,
      to: receiver,
      subject: subject,
      html: data,
    };

    const transport = nodemailer.createTransport(settings);

    return new Promise<any>((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
          console.log(error);
        }
        resolve(info);
        // console.log(info)
      });
    });
  }

  async sendEmail(
    receiver: string,
    subject: string,
    user: string,
    content: string,
    template: string,
  ) {
    let data = '';
    try {
      content = await this.renderFile(user, receiver, content, template);
      data = await this.renderFile(user, receiver, content, 'layouts/main');
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException([
        'Mail service: Unable to send email',
      ]);
    }

    let response;
    try {
      response = await this.sendMailAsync(receiver, subject, data);
    } catch (e) {
      console.error(e);
      return new InternalServerErrorException([
        'Mail service: Unable to send email',
      ]);
    }

    return response;
  }
}
