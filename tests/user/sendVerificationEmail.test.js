import nodemailer from 'nodemailer';
import { MailConfigurations } from '../../src/utils/mailConfigurations';
import { sendEmail } from '../../src/utils/sendEmail.js';

describe('sendVerificationEmail', () => {
  it('Sends an email', async () => {
    const transporter = {
      sendMail: jest.fn().mockResolvedValue(true),
    };
    
    nodemailer.createTransport = jest.fn().mockReturnValue(transporter);
    const email = 'nshimiyejayd200@gmail.com';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMzg2NzI4LTZkZDktNGUwYi05YTAwLWI4MWZmYTBjNjc2MiIsImVtYWlsIjoibnNoaW1peWVqYXlkMjAwQGdtYWlsLmNvbSIsImlhdCI6MTY3NjA0NTI5MX0.3yBBpq3HmRkyWq9PMoaThRPzBUmtW3LVvPCCDKBWQZE';
    const result = sendEmail(MailConfigurations.emailVerificationConfig(email, userToken));
    
    expect(result).toBe(true);
  });
});

