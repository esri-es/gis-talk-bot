require("isomorphic-fetch");
require("isomorphic-form-data");
var debug = require('debug')('gis-talk-bot-v2:utils');
const TYPE_KEYWORDS = require('./../data/keywords.json');
const EXCEPTIONS = {
  "storymap" : `type:"Web Mapping Application"`,
  "map journals" : `type:"Web Mapping Application"`,
  "self configured templates" : `type:"Web Mapping Application" typekeywords:"selfConfigured" NOT typekeywords:"Ready To Use"`,
  "published codes" : `(type:"code samples" OR type:"add-ins" OR type:"geoprocessing samples") -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration"`,
  "vector tiles" : `vector tiles`
}

const { request } = require("@esri/arcgis-rest-request");
const ORGANIZATION_ID = "UlkXMDr5qa7NVX95";

function findItemByType (parametersObj){
  debug("parameters received : %o", parametersObj);

  let query =  keywordException(parametersObj.content_type.toLowerCase())
    ? EXCEPTIONS[parametersObj.content_type.toLowerCase()]
    : `type:"${parametersObj.content_type}"`;
  return request('https://www.arcgis.com/sharing/rest/search', {
      params: {
        num: 5,
        //q: `orgid:${ORGANIZATION_ID} type:${parametersObj.keywords}`
        q: query
      }
    })

}

function keywordException(clue) {
  return EXCEPTIONS.hasOwnProperty(clue);
}


function buidQuery (parametersObj) {
  var query = [];
  if (parametersObj.hasOwnProperty("content_type")){
    query.push(`type:${parametersObj.content_type}`);
  }
  if (parametersObj.hasOwnProperty("tags")){
    query.push(`tags:"${parametersObj.tags}""`);
  }


}


module.exports = {
  findItemByType : findItemByType
}
