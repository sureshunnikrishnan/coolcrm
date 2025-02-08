const CryptoJS = require('crypto-js');

const encryptMobile = (mobileNumber) => {
  return CryptoJS.AES.encrypt(
    mobileNumber,
    // @ts-ignore
    process.env.ENCRYPTION_KEY
  ).toString();
};

const decryptMobile = (encryptedMobile) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedMobile,
    // @ts-ignore
    process.env.ENCRYPTION_KEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptMobile,
  decryptMobile
};
