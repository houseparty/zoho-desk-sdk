'use strict';

/**
 * Class defines options for the Zoho Desk sdk
 */
class ZohoOpts {
  /**
   * Create Zoho Desk options. The system will attempt to use envars for ny values not explicitly provided in the
   * opts parameter
   *
   * @param {object} opts JS object of options
   */
  constructor(opts = {}) {
    /**
     * @type {string}
     * A previously generated refresh token used to generate API keys. REQUIRED
     *
     * Envar: `ZOHO_DESK__REFRESH_TOKEN`
     */
    this.refreshToken = opts.refreshToken || process.env.ZOHO_DESK__REFRESH_TOKEN;
    if (!this.refreshToken) throw new Error('No "refreshToken" option provided to ZohoOpts');

    /**
     * @type {string}
     * Client ID for this app client. REQUIRED
     *
     * Envar: `ZOHO_DESK__CLIENT_ID`
     */
    this.clientId = opts.clientId || process.env.ZOHO_DESK__CLIENT_ID;
    if (!this.clientId) throw new Error('No "clientId" option provided to ZohoOpts');

    /**
     * @type {string}
     * Client Secret for this app client. REQUIRED
     *
     * Envar: `ZOHO_DESK__CLIENT_SECRET`
     */
    this.clientSecret = opts.clientSecret || process.env.ZOHO_DESK__CLIENT_SECRET;
    if (!this.clientSecret) throw new Error('No "clientSecret" option provided to ZohoOpts');

    /**
     * @type {string}
     * The Oauth scope to use when generating access tokens. REQUIRED
     *
     * Envar: `ZOHO_DESK__SCOPE`
     */
    this.scope = opts.scope || process.env.ZOHO_DESK__SCOPE;
    if (!this.scope) throw new Error('No "scope" option provided to ZohoOpts');

    /**
     * @type {string}
     * The redirect URI for this app client. REQUIRED
     *
     * Envar: `ZOHO_DESK__REDIRECT_URI`
     */
    this.redirectUri = opts.redirectUri || process.env.ZOHO_DESK__REDIRECT_URI;
    if (!this.redirectUri) throw new Error('No "redirectUri" option provided to ZohoOpts');

    /**
     * @type {string}
     * Base URL used for all API operations. Optional: Default "https://desk.zoho.com/api/v1/"
     *
     * Envar: `ZOHO_DESK__BASE_URL`
     */
    this.baseUrl = opts.baseUrl || process.env.ZOHO_DESK__BASE_URL || 'https://desk.zoho.com/api/v1/';

    /**
     * @type {boolean}
     * Whether or not verbose logging should be used. If provided as an envar the string must exactly equal "true"
     * Optional: default false
     *
     * Envar: `ZOHO_DESK__VERBOSE`
     */
    this.verbose = opts.verbose;
    if (typeof this.verbose === 'undefined') this.verbose = process.env.ZOHO_DESK__VERBOSE === 'true' ? true : false;

    /**
     * @type {number}
     * The default Org ID to use for all requests. Optional
     *
     * Envar: `ZOHO_DESK__ORG_ID`
     */
    this.orgId = opts.orgId || process.env.ZOHO_DESK__ORG_ID || null;
  }
}

module.exports = ZohoOpts;
