/* We asume that we'll deal with array of objects at the moment */
var debug = require('debug')('gis-talk-bot-v2:adapters');

/* Taken from : https://stackoverflow.com/questions/25553910/one-liner-to-take-some-properties-from-object-in-es-6 */
function pick(o, ...props) {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}

var TELEGRAM_ACTION_RESPONSES = {
  action_getItemsByType : function telegram_getItemsByType(el){

      return {
        buttons: [{
          "postback": el.url === "NOWAY" ? "http://www.google.es" : el.url,
          "text": el.url === "NOWAY" ? "Sorry No Link" : "View Details"
        }],
        "platform": "telegram",
        "title": el.title,
        "subtitle" : el.type,
        "type": 1
      }

  }
};


function telegram (arr,payloadOptions) {

   let telegramPayloadMessages = arr
    .map(el => pick(el, ...payloadOptions.links_fields.concat(payloadOptions.text_fields)))
    .map(TELEGRAM_ACTION_RESPONSES[payloadOptions.action]);
    debug("Processing Telegram payload action_getItemsByType for [%O]", telegramPayloadMessages);
    return {
        speech: "Estos son tus resultados",
        messages : telegramPayloadMessages

    };
}


module.exports = {
  telegram : telegram
}
