export const googleProfile = {
  id: '098765432109876543210',
  displayName: 'Test Name',
  name: { familyName: 'Test', givenName: 'Name' },
  emails: [{ value: 'googlemail@gmail.com' }],
  photos: [
    {
      value:
        'https://lh3.googleusercontent.com/a/AGJbkhbxHkbHJuF_bANkH0980_l4NJkhhyGofB',
    },
  ],
};

export const successRegister = {
  firstname: 'NameOne',
  lastname: 'NameTwo',
  email: 'register@gmail.com',
  phone: '0987654321',
  password: '@Test123',
  role: 'seller',
  verified: false
};

export const successBuyerRegister = {
  firstname: 'NameOnebuyer',
  lastname: 'NameTwobuyer',
  email: 'buyer@gmail.com',
  phone: '0987654321',
  password: '@Test123',
  role: 'buyer',
  verified: true
};

export const buyerToken = {};

export const passwordReg = {
  firstname: 'NameOne',
  lastname: 'NameTwo',
  email: 'password@gmail.com',
  phone: '0987654321',
  password: '@Test123',
};

export const successReg = {
  firstname: 'NameOne',
  lastname: 'NameTwo',
  email: 'success@gmail.com',
  phone: '0987654321',
  password: '@Test123',
  role: 'seller',
  verified: false
};

export const verifiedLogin = {
  email: 'verified@gmail.com',
  password: 'Pass@123',
};

export const unverifiedLogin = {
  email: 'unverified@gmail.com',
  password: 'Pass@123',
};

export const unregisteredLogin = {
  email: 'unregistered@gmail.com',
  password: 'Pass@123',
};

export const invalidPassword = {
  email: 'verified@gmail.com',
  password: 'Password',
};

export const successPasswordUpdate = {
  old_password: 'Pass@123',
  new_password: 'Pass@123',
};

export const invalidPasswordUpdate = {
  old_password: 'Qwerty1234',
  new_password: 'Qwerty12',
};

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiMmM2MGMyLTFiMDctNGJjNC1hYTA4LTA2ZWQ3YTEyNTRhMCIsImVtYWlsIjoidGVzdG1haWxAZ21haWwuY29tIiwiaWF0IjoxNjc2MjM1MzA1fQ.LrI-2aK9YObdrGhtnbcBt-74ulBfYKmOLj9xl-8be64';

  export const adminCredentials = {
	email: 'admin@gmail.com',
	password: 'Password@123',
};

export const id='76432d88-a891-4c4f-9b8f-aca96513f4dd';

export const invalidId = '711149da-2e9c-4ce5-a90f-55dc433dafa9';

export const profileSeeds = {
	firstname: 'paterne',
	lastname: 'NameTwo',
	billingAddress : '{"street":"kv 343 c","province":"Kigali","city":"Kicukiro","zip_code":"0000","country":"rwanda"}',
	socialLinks:'{"facebook": "https://web.facebook.com/?_rdc=1&_rdr","instagram": "https://www.instagram.com/","twitter": "https://twitter.com/home"}',
	birthdate:'2022-04-29',
};
export const userToRegister = {
	firstname: 'NameOne',
	lastname: 'NameTwo',
	email: 'uKnow@gmail.com',
	phone: '0987654321',
	password: '@Test123',
};

export const sellerUser = {
  email: 'kwizsam@gmail.com',
  password: 'Pass@123'
};

export const sellerId = 'b53278a7-daf3-4c6a-99ef-7579d9b43c32';

export const randomId = 'afa9b976-5ec0-4b46-8068-45b9fc4d156d';

export const invalidOTP = '000000';

export const expiredOTP = '123456';

export const successResetRegister = {
  firstname: 'NameOne',
  lastname: 'NameTwo',
  email: 'reseter@gmail.com',
  phone: '0987654321',
  password: '@Test123',
};
export const resetEmail = {
  email: 'reseter@gmail.com'
}

export const resetPassword = {
  newPassword: 'Sracerimo@123'
}
