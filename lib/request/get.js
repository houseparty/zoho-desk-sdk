'use strict';

// /**
//  * Performs a GET request. This method must be bound to an object with an internal `_endpoint` array that
//  * will be used to generate the endpoint to query. As such, this method _MUST NOT_ be defined using arrow notation
//  *
//  * @param {object} opts Request options
//  * @param {boolean} paginate If the system should attempt to auto-paginate the request
//  */
const get = async function(opts = {}, paginate = false) {
  if (opts === null) opts = {};
  if (!opts.endpoint) opts.endpoint = this._endpoint.join('/');

  opts.method = 'GET';

  return this._request.api(opts, paginate);
};

module.exports = get;
