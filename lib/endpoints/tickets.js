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
// /tickets     - get; post

/**
 *  Generator
 *
 * @param {object} request Previously instantiated request module
 */
const generator = function(request) {
  /**
   * Starting point for the 'tickets' API paths. Note that an orgId must be provided in the request options for _all_
   * contact requests
   */
  const tickets = {
    _endpoint: ['tickets'],
    _request: request,

    /**
     * GET information for all tickets
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
  };


  return tickets;
};

module.exports = generator;
