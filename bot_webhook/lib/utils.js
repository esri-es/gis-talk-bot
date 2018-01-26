require("isomorphic-fetch");
require("isomorphic-form-data");

var debug = require('debug')('gis-talk-bot-v2:utils');

var moment = require('moment');

const TYPE_KEYWORDS = require('./../data/keywords.json');
const EXCEPTIONS = {
  "storymap" : `type:"Web Mapping Application"`,
  "map journals" : `type:"Web Mapping Application"`,
  "self configured templates" : `type:"Web Mapping Application" typekeywords:"selfConfigured" NOT typekeywords:"Ready To Use"`,
  "published codes" : `(type:"code samples" OR type:"add-ins" OR type:"geoprocessing samples") -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration"`,
  "vector tiles" : `vector tiles`
}
const KNOWN_ORGANIZATIONS = {
  "geogeeks" : "UlkXMDr5qa7NVX95"
}
const DEFAULTS = {
  numResults : 5
}

const FILTER_ADDINS = {
  "organization" : function(paramsObj) {
    return `orgid:"${KNOWN_ORGANIZATIONS[paramsObj.organization]}"`
  },
  "uploaded_range" : function(paramsObj) {
    //return `uploaded:[0000001259692864000 TO 0000001260384065000]`
    let now = moment().valueOf();
    return `uploaded:[0000001516356565000 TO ${now}]`;
  }
};

const { request } = require("@esri/arcgis-rest-request");


function findItemByType (parametersObj){
  debug("parameters received : %o", parametersObj);

  let query =  keywordException(parametersObj.content_type.toLowerCase())
    ? EXCEPTIONS[parametersObj.content_type.toLowerCase()]
    : `type:"${parametersObj.content_type}"`;
  let currentOrg = addFilterFromParameterName(parametersObj,"organization");
  let upload_time_frame = addFilterFromParameterName(parametersObj,"upload_range");

   debug("API REST query [%s]", `${query} ${currentOrg} ${upload_time_frame}`);
  return request('https://www.arcgis.com/sharing/rest/search', {
      params: {
        num: DEFAULTS.numResults,
        q: `${query} ${currentOrg} ${upload_time_frame}`
      }
    })

}

function addFilterFromParameterName(paramsObj, key) {
  return paramsObj.hasOwnProperty(key)
    ? paramsObj[key] === ""
      ? ""
      : FILTER_ADDINS[key](paramsObj)
    : "";
}



function keywordException(clue) {
  return EXCEPTIONS.hasOwnProperty(clue);
}



module.exports = {
  findItemByType : findItemByType
}
