import models from '../../src/database/models/index';
import { delistExpiredProducts } from '../../src/services/delistExpiredProduct.service';
import { UserService } from '../../src/services/user.service';
import { sendEmail } from '../../src/utils/sendEmail.util';
import { emailConfig } from '../../src/utils/mail.util';
import { expiredProductMessage } from '../../src/utils/mailTemplates.util';
import { ProductService } from '../../src/services/product.service';
import { eventEmit, knownEvents, subscribe } from '../../src/utils/events.util';
import { expiredProduct1, expiredProduct2 } from '../mocks/product.mock';
import { expect, describe, jest, it, afterEach } from '@jest/globals';

jest.mock('../../src/database/models/index');
jest.mock('../../src/services/user.service');
jest.mock('../../src/utils/sendEmail.util');
jest.mock('../../src/utils/mail.util');
jest.mock('../../src/utils/mailTemplates.util');
jest.mock('../../src/services/product.service');
jest.mock('../../src/utils/events.util');

describe('delistExpiredProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('marks expired products as expired and updates their availability', async () => {
    
    models.Products.findAll.mockResolvedValue([expiredProduct1, expiredProduct2]);

    UserService.getUserById.mockResolvedValue({ email: 'seller1@example.com' });

    sendEmail.mockResolvedValue();
    ProductService.updateProduct.mockResolvedValue();

    await delistExpiredProducts();
    expect(ProductService.updateProduct).toHaveBeenCalledTimes(0);
    
    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenCalledWith(emailConfig({
      email: 'seller1@example.com',
      subject: 'Product has expired',
      content: expiredProductMessage(expiredProduct1)
    }));
    expect(sendEmail).toHaveBeenCalledWith(emailConfig({
        email: 'seller2@example.com',
        subject: 'Product has expired',
        content: expiredProductMessage(expiredProduct2)
      }));

    expect(eventEmit).toHaveBeenCalledTimes(2);
    expect(eventEmit).toHaveBeenCalledWith(knownEvents.productExpired, { product: expiredProduct1, isExpired: true });
    expect(eventEmit).toHaveBeenCalledWith(knownEvents.productExpired, { product: expiredProduct2, isExpired: true });

    const updateProductCallback = subscribe.mock.calls[0][1];
    updateProductCallback({ product: expiredProduct1, isExpired: true });
    expect(ProductService.updateProduct).toHaveBeenCalledTimes(1);
    expect(ProductService.updateProduct).toHaveBeenCalledWith({ isAvailable: false, isExpired: true }, expiredProduct1.id);
  });
});