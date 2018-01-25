require("isomorphic-fetch");
require("isomorphic-form-data");
var debug = require('debug')('gis-talk-bot-v2:utils');
const TYPE_KEYWORDS = require('./../data/keywords.json');

const { request } = require("@esri/arcgis-rest-request");
const ORGANIZATION_ID = "UlkXMDr5qa7NVX95";

function findItemByType (parametersObj){
  debug("parameters received : %o", parametersObj);
  if (keywordExists(parametersObj.content_type)){
    return request('https://www.arcgis.com/sharing/rest/search', {
      params: {
        num: 5,
        //q: `orgid:${ORGANIZATION_ID} type:${parametersObj.keywords}`
        q: `type:"${parametersObj.content_type}"`
      }
    })
  }

}

function keywordExists(clue) {
  let re = new RegExp(clue, "ig");
  return clue.toLowerCase() === "storymap"
     ? "Web Mapping Application"
     : TYPE_KEYWORDS.includes(clue) || TYPE_KEYWORDS.filter(el => re.test(clue)).length !== 0;
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
