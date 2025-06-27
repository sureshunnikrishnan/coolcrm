const CryptoJS = require('crypto-js');
const config = require('../config');

const encryptMobile = (mobileNumber) => {
  return CryptoJS.AES.encrypt(
    mobileNumber,
    config.encryptionKey
  ).toString();
};

const decryptMobile = (encryptedMobile) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedMobile,
    config.encryptionKey
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptMobile,
  decryptMobile
};
