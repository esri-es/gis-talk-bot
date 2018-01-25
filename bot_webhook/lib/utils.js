require("isomorphic-fetch");
require("isomorphic-form-data");

const { request } = require("@esri/arcgis-rest-request");
const ORGANIZATION_ID = "UlkXMDr5qa7NVX95";

function findItemByType (parametersObj){
  return request('https://www.arcgis.com/sharing/rest/search', {
    params: {
      num: 20,
      q: `orgid:${ORGANIZATION_ID} type:${parametersObj.keywords}`
    }
  })
}


module.exports = {
  findItemByType : findItemByType
}
