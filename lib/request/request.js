'use strict';

const phin = require('phin');
const isArray = require('lodash/isArray');

const AuthToken = require('../data/auth-token.js');

const RequestOpts = require('../options/request-opts.js');
const ZohoOpts = require('../options/zoho-opts.js');

const authBaseUrl = 'https://accounts.zoho.com/oauth/v2/token';

// Constants
/**
 * @type {number}
 * The maximum number of items that can be retrieved in a single request
 */
const MAX_LIMIT = 99;

class Request {
  /**
   * Constructor will define options
   *
   * @param {ZohoOpts} opts Valid options are defined by the zoho-opts module
   */
  constructor(opts) {
    if (opts instanceof ZohoOpts) {
      this.options = opts;
    } else {
      this.options = new ZohoOpts(opts);
    }

    // Set an empty authentication token so a new one is generated on the first request
    this._token = new AuthToken(null);
  }

  /**
   * @private
   * Simple wrapper of console.log that will only fire if verbose is set to true
   *
   * @param {string} msg Message to log
   */
  _log(msg) {
    if (!this.options.verbose) return;
    console.log(msg);
  }

  async _generateAuthToken() {
    // Extract required options
    const {redirectUri, scope, clientId, clientSecret, refreshToken} = this.options;

    let params = `?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`;
    params += `&redirect_uri=${redirectUri}&scope=${scope}&grant_type=refresh_token`;

    const opts = {
      url: authBaseUrl + params,
      method: 'POST'
    };

    let res = await phin(opts);
    try {
      res = JSON.parse(res.body.toString());
    } catch (e) {
      console.error('Error parsing Zoho API Token');
      throw e; // Bubble
    }

    if (res.error) {
      console.error(res);
      throw new Error(`Error getting API Token: ${res.error}`);
    };

    return new AuthToken(res);
  }

  /**
   * Perform an arbitrary request to the Zoho API. This method will automatically attempt to paginate requests when the
   * autoPaging parameter is set to `true`
   *
   * @param {RequestOpts} opts Options passed to the API request
   * @param {boolean} autoPaging If we are auto-paging
   *
   * @return {Promise} Promise resolves with success data, rejects with a failure. If no data was available will return
   *                   null
   */
  async api(opts, autoPaging = false) {
    // First check to see if we need to regenerate our auth token
    if (this._token.expiresAt <= Date.now()) {
      this._log('Previous auth token expired, generating new one...');
      this._token = await this._generateAuthToken();
      this._log('New token generated successfully');
    }

    // Set the auth token
    opts.token = this._token.token;

    // Set the default Org Id if applicable
    if (!opts.orgId && this.options.orgId) opts.orgId = this.options.orgId;

    // Check to see if pagination is explicitly disabled
    if (!opts.params) opts.params = {};
    if (autoPaging) {
      // Pagination is not disabled. Add the maximum limit
      if (!opts.params.from) opts.params.from = 1;
      opts.params.limit = MAX_LIMIT;
    }

    // Make the request and parse the return body
    this._log(`Sending Request with options:\n${JSON.stringify(opts, null, 2)}`);
    let res = await phin(new RequestOpts(opts));

    res = res.body.toString();

    // If the response body was empty then return null, there wasn't an error, there was just no data available
    if (!res) return null;

    try {
      res = JSON.parse(res);
    } catch (e) {
      console.error('Error parsing Request JSON body');
      console.error(res);
      throw e;
    }

    // If there is a `data` parameter, make the response the contents of that parameter
    if (res.data) res = res.data;

    // Check to see if we need to paginate
    // First, if the response isn't an array then we don't need to worry about it, this is an endpoint that doesn't
    // return more than one item
    if (!isArray(res)) return res;

    // if we got the maximum number of items, this means there is a very good chance there are more items to get
    if (autoPaging && res.length === MAX_LIMIT) {
      opts.params.from = opts.params.from + MAX_LIMIT;
      this._log(`Auto-paginating for items ${opts.params.from}-${opts.params.from + MAX_LIMIT}...`);
      const newRes = await this.api(opts, true);

      if (newRes !== null) {
        res = res.concat(newRes);
      }
    }

    return res;
  }
}

module.exports = Request;
