export default {
  Address: {
    conferences: async ({ id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().where('address_id', id);
      return conference;
    },
  },

  Query: {
    getAllAddresses: async (
      root,
      data,
      { models: { Address }, ValidationError },
    ) => {
      try {
        const addresses = await Address.query();
        return addresses;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getAddressByID: async (
      root,
      { id },
      { models: { Address }, ValidationError },
    ) => {
      try {
        const address = await Address.query().findById(id);
        if (!address) {
          throw new ValidationError('address-not-found');
        }
        return address;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'address-not-found') {
          throw new ValidationError('address-not-found');
        }
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertAddress: async (
      root,
      data,
      { models: { Address }, ValidationError },
    ) => {
      try {
        const newAddress = await Address.query().insert(data);
        return newAddress;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateAddress: async (
      root,
      data,
      { models: { Address }, ValidationError },
    ) => {
      try {
        const updateAddress = await Address.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateAddress;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteAddress: async (
      root,
      { id },
      { models: { Address }, ValidationError },
    ) => {
      try {
        const address = await Address.query().findById(id);

        // // delete all conference of address with id
        await address.deleteConference();
        if (!address) throw new ValidationError('Not found address');

        // delete address
        await Address.query().deleteById(id);
        return address;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
