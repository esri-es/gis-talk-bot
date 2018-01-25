var debug = require('debug')('esri-bot-v2:actions');
const ADAPTERS = require('./adapters.js');

/*
Get all auxiliary functions from utils.js
If you need to define some other functions which arent actions , please define them there.
Keep this this file only with action_ functions for clarity and cleanliness sake */

const UTILS = require('./utils');

/* Defined action name has to be preceeded by action_ */
/* Parameters pased by dialogFlow / development are in req.customParams */

function action_getItemsByType(req,res,opts){
  debug("Running action_getItemsByType");
  res.setHeader('Content-Type', 'application/json');
  return UTILS.findItemByType(req.customParams)
    .then((resp) => {
      let list = resp.results
        .map(item => ({
          title : item.title,
          url : item.url
        }))
        .filter(item => item.url !== null )

      let response = typeof(ADAPTERS[opts.adapter]) !== "function"
        ? list.length > 0
            ? list
            : "No results"
        : ADAPTERS[opts.adapter](list, { links_fields : ["url"], images_fields : [""] , text_fields : ["title","owner"], action: "action_getItemsByType"});

        let responseObj = opts.adapter === "agent"
          ? { "speech": response, "displayText": response}
          : response;
        res.send(JSON.stringify(responseObj));
  });

}



module.exports = {
  nonprivileged : {
    getItemsByType : action_getItemsByType
  },
  privileged : {}
}
