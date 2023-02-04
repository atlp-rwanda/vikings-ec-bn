import { login2FATemplate } from '../utils/mailTemplates.util';
import { sendEmail } from '../utils/sendEmail.util';
import { generateRandomCode } from '../utils/twoFActorAuth.util';
import { UserService } from './user.service';
import { emailConfig } from '../../src/utils/mail.util';

export const sendAuthCode = async (firstname, email, id) => {
    const authCode = generateRandomCode();
    const verificationMessage = login2FATemplate(authCode, firstname, id);
    sendEmail(emailConfig({email: email, subject: 'Login verification code', content: verificationMessage}));
    await UserService.updateUser({authCode}, id);
};
