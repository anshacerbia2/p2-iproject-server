// const { config } = require("dotenv");

const SANDBOX_BASE_URL = 'https://api.sandbox.midtrans.com/v2';
const PRODUCTION_BASE_URL = 'https://api.midtrans.com/v2';

class ConfigPaymentController {
  static serverKey = 'SB-Mid-server-zGenRmiA8ix2wE35TFIShv3A';

  static isProduction = false;
  static is3ds = false;
  isSanitized = false;

  static getBaseUrl() {
    return SANDBOX_BASE_URL;
  }
}

module.exports = ConfigPaymentController;
