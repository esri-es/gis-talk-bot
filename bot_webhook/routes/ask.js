var express = require('express');
var router = express.Router();
var debug = require('debug')('gis-talk-bot-v2:ask');
const POWER_USERS = /,/.test(process.env["POWER_USERS"])
                      ? process.env["POWER_USERS"].split(",").map(el => +el)
                      : [+process.env["POWER_USERS"]];


debug("Running mode [%s]", process.env["BOT_MODE"]);

function actionType (actionsObj, action) {
  return actionsObj.privileged.hasOwnProperty(action)
    ? "privileged"
    : actionsObj.nonprivileged.hasOwnProperty(action)
      ? "nonprivileged"
      : "unknown";
}


function reject(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    speech: "Upps, I'm still learning, please give me time",
    displayText : "Upps, I'm still learning, please give me time"
  });
  res.end();
}

function checkRoleAndAction(req,res,next) {
  let isNotDefaultAgent = req.body.hasOwnProperty("originalRequest") && req.body.originalRequest.hasOwnProperty("source");
  req.currentAdapter = isNotDefaultAgent
        ? req.body.originalRequest.source
        : "agent";
  switch(actionType(req.app.get("ACTIONS"), req.body.result.action)) {
    case 'privileged':
        if (req.body.hasOwnProperty("originalRequest") && POWER_USERS.includes(req.body.originalRequest.data.message.chat.id)) {
          req.actionType = "privileged";
          next();
        } else {
          reject(req,res);
        }
        break;
    case 'nonprivileged':
        req.actionType = "nonprivileged";
        next();
        break;
    case 'unknown':
        reject(req,res);
        break;
  }
}


router.post('/', checkRoleAndAction, function(req,res,next){
  req.customParams = req.body.result.parameters;
  req.app.get("ACTIONS")[req.actionType][req.body.result.action](req,res, { adapter :  req.currentAdapter });
});

module.exports = router;
