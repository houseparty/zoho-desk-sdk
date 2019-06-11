'use strict';

// /**
//  * Performs a PATCH request. This method must be bound to an object with an internal `_endpoint` array that
//  * will be used to generate the endpoint to query. As such, this method _MUST NOT_ be defined using arrow notation
//  *
//  * @param {object} opts Request options
//  */
const patch = async function(opts) {
  if (typeof opts === 'undefined') opts = {};
  if (!opts.endpoint) opts.endpoint = this._endpoint.join('/');

  opts.method = 'PATCH';

  return this._request.api(opts);
};

module.exports = patch;
