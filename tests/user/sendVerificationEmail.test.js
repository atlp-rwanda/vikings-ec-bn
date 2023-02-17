import nodemailer from 'nodemailer';
import { sendEmail } from '../../src/utils/sendEmail';
import { Mail } from '../../src/utils/mail.util';
import { verifyEmailTemplate } from '../../src/utils/mailTemplates.util';

describe('sendVerificationEmail', () => {
  it('Sends an email', async () => {
    const transporter = {
      sendMail: jest.fn().mockResolvedValue(true),
    };

    nodemailer.createTransport = jest.fn().mockReturnValue(transporter);
    const email = 'nshimiyejayd200@gmail.com';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMzg2NzI4LTZkZDktNGUwYi05YTAwLWI4MWZmYTBjNjc2MiIsImVtYWlsIjoibnNoaW1peWVqYXlkMjAwQGdtYWlsLmNvbSIsImlhdCI6MTY3NjA0NTI5MX0.3yBBpq3HmRkyWq9PMoaThRPzBUmtW3LVvPCCDKBWQZE';
    const template = verifyEmailTemplate(userToken);

    const result = sendEmail(Mail.emailConfig({email: email, subject: 'Vikings email verification', content: template}));

    expect(result).toBe(true);
  });
});