'use strict';

const cloneDeep = require('lodash/cloneDeep');
const isArray = require('lodash/isArray');

// String constants
/**
 * Base url for all API requests
 */
const BASE_URL = 'https://desk.zoho.com/api/v1/';

/**
 * Wrapper for phin options that adds a little extra convenience functionality. See constructor for more information
 */
class RequestOpts {
  /**
   * @private
   * Generates a URL parameter string from a supplied key-value store (object)
   *
   * @param {object} params Clean object containing key-value parameter pairs
   *
   * @return {string} Fully rendered parameter string
   */
  _createParamString(params) {
    // Parameters are provided as an object of key-value pairs
    const paramStringArr = [];
    for (const key in params) {
      paramStringArr.push(`${key}=${params[key]}`);
    }

    // Sanity check - make sure there is at least one parameter before continuing
    if (!paramStringArr.length) return '';

    return `?${paramStringArr.join('&')}`;
  }

  /**
   * @private
   * Creates authorization headers for requests
   *
   * @param {string} token Previously generated authorization token
   *
   * @return {object} Object with the required authorization headers
   */
  _createAuthHeaders(token) {
    // Error on missing data
    if (!token) throw new Error(`Error generating authorization headers: missing token`);

    return {
      Authorization: `Zoho-oauthtoken ${token}`
    };
  }

  /**
   * @private
   * Creates org ID headers for requests
   *
   * @param {string} orgId ID of the Zoho organization
   *
   * @return {object} Object with the required org id headers
   */
  _createOrgHeaders(orgId) {
    // Error on missing data
    if (!orgId) throw new Error(`Error generating authorization headers: missing org id`);

    return {
      orgId
    };
  }

  /**
   * @private
   * Creates a URL string with the provided endpoint. The endpoint provided can either be a string, or an array that
   * will be joined together
   *
   * @param {string|string[]} endpoint The required endpoint. Note that if a string is supplied is MUST NOT begin with
   *                                   a slash ('/')
   *
   * @return {string} Fully constructed URL
   */
  _createUrl(endpoint) {
    if (typeof endpoint === 'string') {
      return `${BASE_URL}${endpoint}`;
    }

    if (isArray(endpoint)) {
      return `${BASE_URL}${endpoint.join('/')}`;
    }

    // If we got here that means the parameter was not a valid type
    throw new Error(`Error creating URL. Expected endpoint string or array, got ${typeof endpoint}`);
  }

  /**
   * This constructor takes an object with the same properties as phinOptions with a few extra properties that make
   * things a little more convenient for the zoho desk sdk
   *
   * The following additional parameters are accepted, all of which are optional:
   * - endpoint {string|string[]} An endpoint to add to the default zoho desk uri base. Can be a string or string array
   * - params {object} key-value pairs that are used to generate request query parameters
   * - token {string} Previously generated access token that allows API operations
   * - orgId {string} ID of the organization to make the request against, required for most requests
   *
   * Note that either a `url` OR `endpoint` parameter must be provided. If both are provided the `endpoint` parameter
   * will be ignored
   *
   * Original phinOptions documentation:
   * https://ethanent.github.io/phin/global.html#phinOptions
   *
   * @param {requestOpts} opts Request options. This object is not altered
   */
  constructor(opts) {
    // First assign the provided options in whole
    const self = cloneDeep(opts);

    // Generate the URL if we weren't given one
    if (!self.url) {
      if (!self.endpoint) throw new Error('Either a URL or Endpoint must be provided to generate request options');

      self.url = this._createUrl(self.endpoint);
      delete self.endpoint;
    }

    // Give a warning if both an endpoint and url was provided, letting the developer know the endpoint will be ignored
    if (self.endpoint) {
      console.warn('Warning: detected url AND endpoint in option construction. Provided endpoint will be ignored');
      delete self.endpoint;
    }

    // Check for special options
    // 1. URL Parameters
    if (self.params) {
      self.url += this._createParamString(self.params);
      delete self.params;
    }

    // 2. Authorization
    if (self.token) {
      if (!self.headers) self.headers = {};
      self.headers = Object.assign(self.headers, this._createAuthHeaders(self.token));
      delete self.token;
    }

    // 3. Org Id
    if (self.orgId) {
      if (!self.headers) self.headers = {};
      self.headers = Object.assign(self.headers, this._createOrgHeaders(self.orgId));
      delete self.orgId;
    }

    return self;
  };
}

module.exports = RequestOpts;
