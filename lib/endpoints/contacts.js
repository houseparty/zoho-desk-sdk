'use strict';

/*
  The `valid-jsdoc` rule has to be ignored so that IntelliSense documentation can properly chain past the "id" methods.
  If the `@return` value is defined for these methods the documentation chain breaks
*/
/* eslint-disable valid-jsdoc */
const get = require('../request/get.js');
const post = require('../request/post.js');
const patch = require('../request/patch.js');

// Endpoints to Support:
// /contacts     - get; post
//   /{contactId}  - get; patch

/**
 *  Generator
 *
 * @param {object} request Previously instantiated request module
 */
const generator = function(request) {
  /**
   * Starting point for the 'contacts' API paths. Note that an orgId must be provided in the request options for _all_
   * contact requests
   */
  const contacts = {
    _endpoint: ['contacts'],
    _request: request,

    /**
     * GET information for all contacts
     *
     * @param {object} opts Request options
     * @param {boolean} paginate If the system should attempt to auto-paginate the request
     *
     * @return {Promise} Promise will resolve with contact data
     */
    get,

    /**
     * POST a new user
     *
     * @param {object} opts Request options
     *
     * @return {Promise} Promise will resolve with a contact object
     */
    post,

    count: {
      _endpoint: ['contacts', 'count'],
      _request: request,

      /**
       * GET information for all contacts
       *
       * @param {object} opts Request options. A `viewId` parameter is required for this method
       * @param {boolean} paginate If the system should attempt to auto-paginate the request
       *
       * @return {Promise} Promise will resolve with contact data
       */
      get
    },

    /**
     * Access to data for a specific contact
     *
     * @param {string} contactId ID of the desired contact
     */
    id: function(contactId) {
      return {
        _endpoint: ['contacts', contactId],
        _request: request,

        /**
         * GET data for this specific contact
         *
         * @param {object} opts Request options
         * @param {boolean} paginate If the system should attempt to auto-paginate the request
         *
         * @return {Promise} Promise will resolve with a contact
         */
        get,

        /**
         * PATCH and update for this specific contact
         *
         * @param {object} opts Request options
         *
         * @return {Promise} Promise will resolve with an array updated contact information
         */
        patch
      };
    }
  };


  return contacts;
};

module.exports = generator;
