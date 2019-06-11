'use string';

const ZohoDeskSDK = require('../index.js');

(async () => {
  const opts = require('../.zoho-opts.json');

  const sdk = new ZohoDeskSDK(opts);

  // const oneContact = await sdk.api.contacts.id('118052000008007001').get();
  // const contacts = await sdk.api.contacts.get(null, true);
  const newContact = await sdk.api.contacts.id('118052000008007001').patch({
    data: {
      firstName: 'MCTESTERSON'
    }
  });
  console.log(newContact);
  // console.log(oneContact);
  // contacts.forEach((item) => console.log(item.email));
})();
