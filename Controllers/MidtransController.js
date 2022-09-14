const midtransClient = require('midtrans-client');
const { Order, Cart, Product } = require('../models');

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

class MidtransController {
  static async charge(request, response, next) {
    try {
      const { bank } = request.body;
      console.log(bank);
      console.log(request.body);
      const UserId = +request.user.id;
      const cart = await Cart.findAll({
        where: { UserId },
        include: {
          model: Product
        }
      });
      const amount = cart.reduce((total, obj) => total + (obj.amount * obj.Product.price), 0);
      let data = {
        payment_type: "bank_transfer",
        transaction_details: {
          gross_amount: amount,
          order_id: new Date().getTime()
        },
        bank_transfer: { bank }
      };
      const chargeResponse = await coreApi.charge(JSON.stringify(data));
      const newOrder = await Order.create({
        UserId,
        order_id: chargeResponse.order_id,
        response_midtrans: JSON.stringify(chargeResponse)
      });
      response.status(200).json({
        order_id: chargeResponse.order_id,
        gross_amount: chargeResponse.gross_amount,
        gross_amount: chargeResponse.gross_amount,
        transaction_status: chargeResponse.transaction_status,
        bank: chargeResponse.va_numbers[0].bank,
        va_number: chargeResponse.va_numbers[0].va_number,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async notification(request, response, next) {
    try {
      const statusResponse = await apiClient.transaction.notification(request.body);
      const response_midtrans = JSON.stringify(statusResponse);
      await Order.update({ response_midtrans }, { where: { id: request.body.id } });
      response.status(200).json({ message: 'Update Succes' })
    } catch (error) {

    }
  }
}
module.exports = MidtransController;