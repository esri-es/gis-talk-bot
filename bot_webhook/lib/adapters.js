/* We asume that we'll deal with array of objects at the moment */
var debug = require('debug')('esri-bot-v2:adapters');

/* Taken from : https://stackoverflow.com/questions/25553910/one-liner-to-take-some-properties-from-object-in-es-6 */
function pick(o, ...props) {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}

var TELEGRAM_ACTION_RESPONSES = {
  action_getItemsByType : function telegram_getItemsByType(el){
      debug("Procesando Telegram payload action_getItemsByType para [%O]", el);
      return {
        buttons: [{
          "postback": el.url,
          "text": `Info sobre ${el.title}`
        }],
        "platform": "telegram",
        "title": el.title,
        "type": 1
      };
  }
};


function telegram (arr,payloadOptions) {

   let telegramPayloadMessages = arr
    .map(el => pick(el, ...payloadOptions.images_fields.concat(payloadOptions.links_fields).concat(payloadOptions.text_fields)))
    .map(TELEGRAM_ACTION_RESPONSES[payloadOptions.action]);

    return {
        speech: "Estos son tus resultados",
        messages : telegramPayloadMessages

    };
}


module.exports = {
  telegram : telegram
}
