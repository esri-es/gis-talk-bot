# Customize

This bot is able to understand all [this keywords](../raw_data/dialogFlow/keywords.json).

Now we will show you add new custom terms like: `storymap`, `map journals`, ...

## Create custom terms

First go to [utils.js](https://github.com/esri-es/gis-talk-bot/blob/master/bot_webhook/lib/utils.js#L5) and search the `EXCEPTIONS` object. It keys map to the `content_type` parameter form DialogFlow, and it values are the `query` that will be sent to the [ArcGIS REST API](https://developers.arcgis.com/rest/users-groups-and-items/search-reference.htm).

How it runs:

* When then payload from DialogFlow is received the webhook runs the [findItemByType()](https://github.com/esri-es/gis-talk-bot/blob/master/bot_webhook/lib/utils.js#L22) method.
* Then it uses [arcgis-rest-js](https://github.com/esri/arcgis-rest-js) to send the query specified in the `EXCEPTIONS`, so it will return a promise (check [actions.js](https://github.com/esri-es/gis-talk-bot/blob/master/bot_webhook/lib/actions.js#L21))
* When it receive the results it will  format them as [Telegram cards](https://dialogflow.com/docs/rich-messages#card) (check [adapters.js](https://github.com/esri-es/gis-talk-bot/blob/master/bot_webhook/lib/adapters.js#L10)) and will be returned.

If you want to debug it run:

`BOT_MODE="prod" BOT_SECRET="comeon" BOT_HEADER="esri-chat"  DEBUG=gis-talk-bot-v2:* bin/www`
