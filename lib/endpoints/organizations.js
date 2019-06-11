'use strict';

/*
  The `valid-jsdoc` rule has to be ignored so that IntelliSense documentation can properly chain past the "id" methods.
  If the `@return` value is defined for these methods the documentation chain breaks
*/
/* eslint-disable valid-jsdoc */
const get = require('../request/get.js');

// Endpoints to Support:
// /organizations     - get
//   /{organizationId}  - get

/**
 *  Generator
 *
 * @param {object} request Previously instantiated request module
 */
const generator = function(request) {
  /**
   * Starting point for the 'organizations' API paths
   */
  const organizations = {
    _endpoint: ['organizations'],
    _request: request,

    /**
     * GET information for all organizations
     *
     * @param {object} [opts] Request options
     * @param {boolean} paginate If the system should attempt to auto-paginate the request
     *
     * @return {Promise} Promise will resolve with organization data
     */
    get,

    /**
     * Access to data for a specific organization
     *
     * @param {string} organizationId ID of the desired organization
     */
    id: function(organizationId) {
      return {
        _endpoint: ['organizations', organizationId],
        _request: request,

        /**
         * GET data for this specific organization
         *
         * @param {object} [opts] Request options
         * @param {boolean} paginate If the system should attempt to auto-paginate the request
         *
         * @return {Promise} Promise will resolve with an array with a single user object
         */
        get
      };
    }
  };


  return organizations;
};

module.exports = generator;
