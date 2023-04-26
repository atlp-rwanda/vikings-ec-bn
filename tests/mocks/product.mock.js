export const validProduct = {
  name: 'coffee',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2024-02-21',
  quantity:5,
  bonus: 300,
};
export const validDateProduct = {
  name: 'coffee',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2020-02-21',
  quantity:5,
  bonus: 300,
};
export const invalidProduct = {
  name: '',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2024-02-21',
  bonus: 300,
  quantity:5,
  userId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
};
export const validProduct2 = {
  name: 'jordan',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2024-02-21',
  quantity:5,
  bonus: 300,
};
export const validProduct3 = {
  name: 'beer',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2024-02-21',
  quantity:5,
  bonus: 300,
};
export const invalidProduct1 = {
  name: 'beer',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2024-02-21',
  quantity:5,
  bonus: 300,
};
export const invaliCategoryProduct = {
  name: 'coffee',
  price: 1000,
  categoryId: 'c93357b7-cfff-44a1-bcc5-835d4ae72f23',
  expiryDate: '2024-02-21',
  quantity:5,
  bonus: 300,
};
export const validCategory = {
  name: 'electronics',
};
export const invalidCategory = {
  name: '',
};
export const existingCategory = {
  name: 'shoes',
};
export const id='b1093b42-f577-4c7f-86db-13a35b6e1112';
export const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjUyNmFkLTc2YmUtNGY0NC1iNWQ5LTgwMzJmMDkyNWMyZCIsImVtYWlsIjoidmVyaWZpZWRAZ21haWwuY29tIiwicm9sZSI6InNlbGxlciIsImZpcnN0bmFtZSI6IkphbmUiLCJsYXN0bmFtZSI6IkRvZSIsImdlbmRlciI6bnVsbCwic3RhdHVzIjpudWxsLCJhdmF0YXIiOm51bGwsInZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2NzYyNzk2NjN9.ZG0Pyw4394QUzwqnd61La4x6DTXNf5LqUjN3Al7zlEM';
export const notSeller =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNzA2ZWE5LWEwMjAtNGE0MC05MDEwLWQ1ZjEwYzA0NDRlYyIsImVtYWlsIjoibXVrdW56aWZhYnJpY2VAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpmYWxzZSwiaWF0IjoxNjc3MjczODIzLCJleHAiOjE3MDg4MDk4MjN9.GF687iepo4QhAruPpGA4ngarvB-rV8KXlMyKPxznW6U';

export const expiredProduct1 = {
  id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
  name: 'Canvas',
  expiryDate: new Date('2022-01-01'),
  isExpired: false,
  isAvailable: true,
  userId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
};
export const expiredProduct2 = {
  id: 2,
  name: 'Nike',
  expiryDate: new Date('2022-02-01'),
  isExpired: false,
  isAvailable: true,
  userId: 2,
};

export const isAvailableSchema = {
  isAvailable: true,
};
export const productId1 = '6717e8c7-c058-4670-90c3-5c8953cc844a';

export const productId = '05239123-3bce-480b-bb95-e9c844b3e9de';
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NDMyZDg4LWE4OTEtNGM0Zi05YjhmLWFjYTk2NTEzZjRkZCIsImVtYWlsIjoidW52ZXJpZmllZEBnbWFpbC5jb20iLCJyb2xlIjoiYnV5ZXIiLCJtdXN0VXBkYXRlUGFzc3dvcmQiOm51bGwsImlhdCI6MTY3NzEzNDM5NCwiZXhwIjoxNjc3MjIwNzk0fQ.hBJoz5hVjUSyVTYth-F5Y2cTCyWVbesQa-2z_fVbxSI');
export const invalidProductId = 'c93357b7-cfff-44a1-bcc5-835d4ae72f23';

export const sellerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyYWI5NDE2LTgxMjktNDNkYi05ZGMxLTZmMmY3YTE3NjMwYiIsImVtYWlsIjoiaXJha296ZXl2ZXM5QGdtYWlsLmNvbSIsInJvbGUiOiJzZWxsZXIiLCJtdXN0VXBkYXRlUGFzc3dvcmQiOm51bGwsImlhdCI6MTY3NzI2NTI3MywiZXhwIjoxNzA4ODAxMjczfQ.hd5v2x2YmKVkTGjlWQfxBjctZ4PHuPxHVdontmwkEsA';

export const validProductId = '6717e8c7-c058-4670-90c3-5c8953cc844a';
export const validProductId1 = 'b5e75a01-5e67-44ad-91bd-f36ab3564a48';
export const unavailableProduct = 'b5e75a01-5e67-44ad-91bd-f36ab3564a48';
export const admin='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNGM2NWQwLWFiZTktNDA1YS1hMmY0LTViNzFhMjMzOGNkZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2NzcyNzQwODIsImV4cCI6MTcwODgxMDA4Mn0.8kMCpB7JHqLrsggJlT2mlu5ZCOrEfJn1k-ImUYWWZ4M';

export const updateProductWithChangedAllImages = {
  name: 'coat',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2030-02-21',
  bonus: 300,
  quantity: 21,
  oldImages: [],
};
export const updateProductWithNochangedImages = {
  name: 'coat',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2030-02-21',
  quantity: 21,
  bonus: 300,
  oldImages: ['http://res.cloudinary.com/djg7yg23y/image/upload/v1679297197/projects/ecommerce/06ee9c32-b93e-405e-bb33-48a6953f391d_1679297194.166.jpg,http://res.cloudinary.com/djg7yg23y/image/upload/v1679297199/projects/ecommerce/6ff703df-55de-4ac0-bb92-a9b0c1736f89_1679297197.501.jpg,http://res.cloudinary.com/djg7yg23y/image/upload/v1679297205/projects/ecommerce/dc53abf2-b7ab-4eca-a4c8-8b7c3ea223de_1679297202.304.jpg,http://res.cloudinary.com/djg7yg23y/image/upload/v1679297765/projects/ecommerce/1f40c869-3c53-41d3-a0ba-5054f563f70f_1679297756.834.jpg'],
};
export const  updateProductWithLessImages ={
  name: 'coat',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2030-02-21',
  quantity: 21,
  bonus: 300,
  oldImages: ['http://res.cloudinary.com/djg7yg23y/image/upload/v1679297197/projects/ecommerce/06ee9c32-b93e-405e-bb33-48a6953f391d_1679297194.166.jpg,http://res.cloudinary.com/djg7yg23y/image/upload/v1679297199/projects/ecommerce/6ff703df-55de-4ac0-bb92-a9b0c1736f89_1679297197.501.jpg'],
};
export const  updateWithOneImage ={
  name: 'coat',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2030-02-21',
  quantity: 21,
  bonus: 300,
  oldImages: ['http://res.cloudinary.com/djg7yg23y/image/upload/v1679297197/projects/ecommerce/06ee9c32-b93e-405e-bb33-48a6953f391d_1679297194.166.jpg,http://res.cloudinary.com/djg7yg23y/image/upload/v1679297199/projects/ecommerce/6ff703df-55de-4ac0-bb92-a9b0c1736f89_1679297197.501.jpg,http://res.cloudinary.com/djg7yg23y/image/upload/v1679297205/projects/ecommerce/dc53abf2-b7ab-4eca-a4c8-8b7c3ea223de_1679297202.304.jpg'],
};
