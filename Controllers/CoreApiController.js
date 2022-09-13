const ApiRequestor = require("./ApiRequestor");
const ConfigPaymentController = require("./ConfigPaymentController");

class CoreApi {
  static async charge(payloads) {
    try {
      let result = await ApiRequestor.post((ConfigPaymentController.getBaseUrl() + '/charge'), ConfigPaymentController.serverKey, payloads);
      console.log(result.data, '<<<<<<<<<<<<<<<<<<<<<<<<<<<this');
      return result.data;

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CoreApi;