'use strict';

/*
  The `valid-jsdoc` rule has to be ignored so that IntelliSense documentation can properly chain past the "id" methods.
  If the `@return` value is defined for these methods the documentation chain breaks
*/
/* eslint-disable valid-jsdoc */
const get = require('../request/get.js');

// Endpoints to Support:
// /views     - get

/**
 *  Generator
 *
 * @param {object} request Previously instantiated request module
 */
const generator = function(request) {
  /**
   * Starting point for the 'views' API paths. Note that an orgId must be provided in the request options for _all_
   * view requests
   */
  const views = {
    _endpoint: ['views'],
    _request: request,

    /**
     * GET information for all views. This method requires a `module` parameter in the request options
     * https://desk.zoho.com/DeskAPIDocument#Views#Views_ListViews
     *
     * @param {object} opts Request options. Requires a `module` parameter
     * @param {boolean} paginate If the system should attempt to auto-paginate the request
     *
     * @return {Promise} Promise will resolve with view data
     */
    get
  };


  return views;
};

module.exports = generator;
