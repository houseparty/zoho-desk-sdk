'use string';

const ZohoDeskSDK = require('../index.js');

(async () => {
  const opts = require('../.zoho-opts.json');

  const sdk = new ZohoDeskSDK(opts);

  const search = await sdk.api.contacts.search.get({
    params: {
      email: 'thejoshuaevans@gmail.com'
    }
  });
  console.log(search);
  // contacts.forEach((item) => console.log(item.email));
})();
