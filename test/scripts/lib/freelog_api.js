(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('freelog_api', [], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.returnsExports = factory();
  }
}(this, function () {
  var Freelog = {};

  Freelog.resource_bucket_url = "/resource_bucket/";
  Freelog.node_name = "presenter";

  Freelog.testfunc = function () {
    console.log('test success!');
  }

  Freelog.ResourceUtil = {}

  //Retrive a single resource by id from resource bucket
  Freelog.ResourceUtil.retrive_resource = function (resource_id, callback){
    //todo: returned result shall be in json format with one extra field of "content:<data>"
    var url = '/resources/'+resource_id;
    $.getJSON(url, callback);
  }

  //Retrive single resource in JSONP
  Freelog.ResourceUtil.retrive_resource_jsonp = function (resource_id, callback){
    var url = 'http://127.0.0.1:3000/resources/'+resource_id+".jsonp?callback=?";
    $.getJSON(url, callback);
  }

  //Rerive metadata of resources as specified by options
  //options are all optional, can be empty object
  //options are:
  //
  //  "resource_type":
  //  "limit":
  //  "callback":
  //
  Freelog.ResourceUtil.retrive_resources_info = function (options){
    //construct url paramter object
    var params = { "node":Freelog.node_name }
    if (typeof options == "object" && options != null){
      if (options["resource_type"] != null){
        params["resource_type"] = options["resource_type"];
      }
      if (options["limit"] != null){
        params["limit"] = options["limit"];
      }
    }

    //ajax call to get resources info in json
    $.getJSON('/resources', params, options["callback"]);
  } 

  return Freelog;
}));

