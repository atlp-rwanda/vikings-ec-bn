export const validProduct = {
  name: 'coffee',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2023-02-21',
  bonus: 300,
};
export const invalidProduct = {
  name: '',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2023-02-21',
  bonus: 300,
  userId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
};
export const validProduct2 = {
  name: 'jordan',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2023-02-21',
  bonus: 300,
};
export const validProduct3 = {
  name: 'beer',
  price: 1000,
  categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
  expiryDate: '2023-02-21',
  bonus: 300,
};

export const invaliCategoryProduct = {
  name: 'coffee',
  price: 1000,
  categoryId: 'c93357b7-cfff-44a1-bcc5-835d4ae72f23',
  expiryDate: '2023-02-21',
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
export const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjUyNmFkLTc2YmUtNGY0NC1iNWQ5LTgwMzJmMDkyNWMyZCIsImVtYWlsIjoidmVyaWZpZWRAZ21haWwuY29tIiwicm9sZSI6InNlbGxlciIsImZpcnN0bmFtZSI6IkphbmUiLCJsYXN0bmFtZSI6IkRvZSIsImdlbmRlciI6bnVsbCwic3RhdHVzIjpudWxsLCJhdmF0YXIiOm51bGwsInZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2NzYyNzk2NjN9.ZG0Pyw4394QUzwqnd61La4x6DTXNf5LqUjN3Al7zlEM';
export const notSeller =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNGM2NWQwLWFiZTktNDA1YS1hMmY0LTViNzFhMjMzOGNkZCIsImVtYWlsIjoidW52ZXJpZmllZEBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJnZW5kZXIiOm51bGwsInN0YXR1cyI6bnVsbCwiYXZhdGFyIjpudWxsLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjc2MzE3MzI0fQ.V-cSXeJe6GbSusqIff2ttiJSXi3-t7uFwrqtq2n5lyM';

  export const expiredProduct1 = {
    id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
    name:'Canvas',
    expiryDate: new Date('2022-01-01'),
    isExpired: false,
    isAvailable: true,
    userId: '872526ad-76be-4f44-b5d9-8032f0925c2d'
  };
 export const expiredProduct2 = {
    id: 2,
    name:'Nike',
    expiryDate: new Date('2022-02-01'),
    isExpired: false,
    isAvailable: true,
    userId: 2
  };

  export const productId1 = '6717e8c7-c058-4670-90c3-5c8953cc844a';

  export const productId = '05239123-3bce-480b-bb95-e9c844b3e9de';
