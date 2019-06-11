'use strict';

const refreshTokenGen = require('./lib/helpers/refresh-token-gen.js');

const Request = require('./lib/request/request.js');
const scopes = require('./lib/data/scopes.js');

// Endpoints
const organizations = require('./lib/endpoints/organizations.js');
const contacts = require('./lib/endpoints/contacts.js');
const views = require('./lib/endpoints/views.js');

class ZohoDeskSDK {
  /**
   * Scopes available when generating access tokens
   */
  static get scopes() {
    return scopes;
  }

  /**
   * Static level access to the refresh token generation helper
   */
  static get refreshTokenGen() {
    return refreshTokenGen;
  }

  /**
   * Constructor takes Zoho options
   *
   * @param {ZohoOpts} opts Valid options are defined by the zoho-opts module
   */
  constructor(opts) {
    /**
     * @private
     * Internal request object used to make requests
     */
    this._request = new Request(opts);

    /**
     * Starting point for API access
     */
    this.api = {
      /**
       * Access to organization data
       */
      organizations: organizations(this._request),

      /**
       * Access to contact data
       */
      contacts: contacts(this._request),

      /**
       * Access to view data
       */
      views: views(this._request)
    };
  }

  /**
   * Sets a default org id to use in all API requests
   *
   * @param {number} id The default org id
   */
  setOrgId(id) {
    this._request.options.orgId = id;
  }
}

module.exports = ZohoDeskSDK;
