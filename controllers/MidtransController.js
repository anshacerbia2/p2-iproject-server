const midtransClient = require('midtrans-client');
const { Order, Cart, Product } = require('../models');

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

const apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

class MidtransController {
  static async charge(request, response, next) {
    try {
      const { bank } = request.body;
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
      console.log(data);
      const chargeResponse = await coreApi.charge(JSON.stringify(data));
      console.log(chargeResponse);
      const newOrder = await Order.create({
        UserId,
        order_id: chargeResponse.order_id,
        response_midtrans: JSON.stringify(chargeResponse)
      });
      response.status(200).json(chargeResponse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async notification(request, response, next) {
    try {
      const notificationJson = apiClient.transaction.notification();
      await Order.update({ response_midtrans: notificationJson }, { where: { order_id: statusResponse.order_id } });
      // const statusResponse = await apiClient.transaction.notification(request.body);
      // const response_midtrans = JSON.stringify(statusResponse);
      // await Order.update({ response_midtrans }, { where: { order_id: statusResponse.order_id } });
      response.status(200).json({ message: 'Update Succes' })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = MidtransController;