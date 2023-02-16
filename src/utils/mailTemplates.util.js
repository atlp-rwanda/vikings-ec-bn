export const verifyEmailTemplate = (userToken) =>{
  return `
  <div style="background-color: #f2f2f2; padding: 20px;">
    <h1 style="color: #004d99; text-align: center;">Welcome to Vikings e-commerce!</h1>
    <p style="color: #000; font-size: 16px;">Please click below to activate your account:</p>
    <a href="${process.env.VERIFY_URL}/${userToken}" style="display: block; text-align: center; padding: 10px 20px; background-color: #004d99; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Verify Your Email</a>
    <p style="color: #000; font-size: 14px;">Thank you for choosing Vikings e-commerce.</p>
  </div>
  `;
};


export const login2FATemplate = (otpCode, firstname, id)=>{
  return `
<body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff;">
    <h1 style="font-size: 24px; margin-top: 0; margin-bottom: 1em;">Login Verification Code</h1>
    <p>Dear ${firstname},</p>
    <p>Please use the following verification code:
    <div style="display: inline-block; margin-top: 10px; margin-bottom: 10px; padding: 10px; background-color: #f7f7f7; border-radius: 4px; font-size: 18px; font-weight: bold;">${otpCode}</div> to complete the login process, at this link: ${process.env.TWO_FACTOR_URL}/${id}/verify/</p>

    <p>Please note that this code is valid for 15 minutes only. If you did not request this login or do not recognize this activity, please contact our support team immediately.</p>
    <p>
    <p>Thank you for choosing our platform.</p>
    <a href="#" style="display: inline-block; margin-top: 10px; margin-bottom: 10px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 18px; font-weight: bold;">Visit Our Website</a>
  </div>
</body>`;
};

export const expiredProductMessage= (product) =>{
 return `The product " ${product.name}" has expired.`;
};
