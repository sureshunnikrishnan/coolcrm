const prisma = require('../../config/database');
const { encryptMobile, decryptMobile } = require('../../utils/encryption');

const createCustomer = async (customerData) => {
  const { name, mobileNumber, email } = customerData;
  const encryptedMobile = encryptMobile(mobileNumber);

  return prisma.customer.create({
    data: {
      name,
      mobileNumber, // Storing raw mobile number temporarily, will address if this is a security concern
      encryptedMobile,
      email,
    },
  });
};

const getAllCustomers = async () => {
  return prisma.customer.findMany();
};

const getCustomerById = async (id) => {
  return prisma.customer.findUnique({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
};
