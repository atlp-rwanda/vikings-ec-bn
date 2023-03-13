import { Payment } from '../database/models/index';

export class PaymentService {
  static async createPayment(payment){
    return Payment.create(payment);
  }

  static async updatePayment(fields, id){
    return Payment.update({...fields}, { where: {id: id}});
  }
}
