'use strict';

class ZohoOpts {
  constructor(opts) {
    /**
     * @type {string}
     * A previously generated refresh token used to generate API keys. REQUIRED
     */
    this.refreshToken = opts.refreshToken;
    if (!this.refreshToken) throw new Error('No "refreshToken" option provided to ZohoOpts');

    /**
     * @type {string}
     * Client ID for this app client. REQUIRED
     */
    this.clientId = opts.clientId;
    if (!this.clientId) throw new Error('No "clientId" option provided to ZohoOpts');

    /**
     * @type {string}
     * Client Secret for this app client. REQUIRED
     */
    this.clientSecret = opts.clientSecret;
    if (!this.clientSecret) throw new Error('No "clientSecret" option provided to ZohoOpts');

    /**
     * @type {string}
     * The Oauth scope to use when generating access tokens. REQUIRED
     */
    this.scope = opts.scope;
    if (!this.scope) throw new Error('No "scope" option provided to ZohoOpts');

    /**
     * @type {string}
     * The redirect URI for this app client. REQUIRED
     */
    this.redirectUri = opts.redirectUri;
    if (!this.redirectUri) throw new Error('No "redirectUri" option provided to ZohoOpts');

    /**
     * @type {string}
     * Base URL used for all API operations. Optional: Default "https://desk.zoho.com/api/v1/"
     */
    this.baseUrl = opts.baseUrl || 'https://desk.zoho.com/api/v1/';

    /**
     * @type {boolean}
     * Whether or not verbose logging should be used. Optional: default false
     */
    this.verbose = opts.verbose || false;

    /**
     * @type {number}
     * The default Org ID to use for all requests. Optional
     */
    this.orgId = opts.orgId || null;
  }
}

module.exports = ZohoOpts;
