const { User } = require('../../models');
const BankTransfer = require('./BankTransferController');
const CoreApi = require('./CoreApiController');

class MidtransController {
  static async bankTransfer(request, response, next) {
    try {
      // const customer = await User.findByPk(request.user.id);
      // let data = request.body;
      let data = null;
      let body = request.body;
      let customers = {
        email: 'l.anshacerbia@gmail.com',
        first_name: 'Ansha',
        last_name: 'Cerbia',
        phone: '081214146648'
      }

      let bankTransfer = new BankTransfer(body.items, customers)
      switch (body.channel) {
        case 'bca':
          data = bankTransfer.bca();
          break;
        case 'bni':
          data = bankTransfer.bni();
          break;
        case 'permata':
          data = bankTransfer.permata();
          break;
      }
      console.log(data);
      // let x = bankTransfer.bca();
      const forVictory = await CoreApi.charge(data)
      response.status(200).json(forVictory);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MidtransController;