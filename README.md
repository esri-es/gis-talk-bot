# gis-talk-bot

We heard about [Sonar](https://github.com/Esri/sonar) last year on Andrew Turner presentation and we though that we could build a bot that could be setup to work within an organization, so any Esri Customer could launch it own bot easily.

# Documentation

# Pre-Requisites

- Telegram Account
- [dialogFlow bot](https://console.dialogflow.com/api-client/). (If you want to build your own Bot)


# Published Demo

1. If you don't have a **Telegram Account**, create one
2. If you already have a Telegram Account you can start to talk to [GISTalkBot](https://web.telegram.org/#/im?p=@GISTalkBot)

# Build your own Bot

## Steps


1. Create a [dialogFlow agent](https://github.com/esri-es/gis-talk-bot/blob/master/docs/videos/create_dialogflow_bot.webmsd.webm)

2. Create your own [Telegram bot](https://github.com/esri-es/gis-talk-bot/blob/master/docs/videos/create_telegram_bot.webmsd.webm)

3. Take note of the **API_TOKEN** of your brand new bot . You'll need it on the next step.

4. Configure Telegram integration on dialogFlow. Watch this video **PENDING**

5. Install on your computer our **Telegram Webhook** . Follow this [video instructions](https://asciinema.org/a/ebc6H7tCId7vZMH3ZOhisJRVn)

6. Test Locally

For the sake of speed , please install [ngrok](https://ngrok.com/download) in your computer. **ngrok** let's your machine be Internet reachable thru a tunneled connection , just with one command :

```bash
ngrok http 3000
```

This command outputs something like:

```bash
ngrok by @inconshreveable                                                                                                                                            (Ctrl+C to quit)

Session Status                online
Account                       --------- ---- --- (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://e117e6ea.ngrok.io -> localhost:3000
Forwarding                    https://e117e6ea.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              1       0       0.00    0.00    5.04    5.04
```

You can also log, replay & check the status of all connections in [http://localhost:4040](http://localhost:4040)

> TIP
Once you've downloaded it , unzip it , and move **ngrok** to **/usr/local/bin** folder , letting you run this command from anywhere

7. Enable **fullfillment** on **fullfillment session** in **dialogflow** in your agent.

8. Fill in **URL** . Taking the **ngrok** setup above as an example , the **URL** field would be :

```bash
https://e117e6ea.ngrok.io/ask
```

> Notice that we append **/ask** at the end of the **URL**

9. Test it!

Open **your telegram chat url** in a Browser and start a conversation!!

10. If the bot doesn't answer , review your setup , and check twice that **dialogflow** intents has fullfillment option check (web-hook)


# Deploy your Webhook

You can use [now.sh](https://zeit.co/now). You can create an account for free!

Once you have created your **now.sh** account , Download **Now Desktop**.

When you have installed **Now Desktop** , open a terminal and go to the folder where you cloned this repo.

At this point , type the following

```bash
cd bot_webhook/
now -e BOT_MODE="prod" -e BOT_SECRET="comeon" -e BOT_HEADER="esri-chat"
```

You will see a similar output like the following:

```bash
Machineitor in ~/esri/hackathon/gis-talk-bot/bot_webhook
± |master U:1 ✗| → now -e BOT_MODE="prod" -e BOT_SECRET="comeon" -e BOT_HEADER="esri-chat"
> Deploying ~/esri/hackathon/gis-talk-bot/bot_webhook under <YOUR_MAIL>
> Using Node.js 8.9.4 (default)
> Ready! https://gis-talk-bot-v2-dmqsafdomn.now.sh (copied to clipboard) [4s]
> You (<YOUR_MAIL>) are on the OSS plan. Your code and logs will be made public.
> NOTE: You can use `now --public` to skip this prompt
> Synced 1 file (1.55KB) [8s]
> Initializing…
```

Update **URL** in **FullFillment** section of **dialogFlow**. The **URL** in this example would be :

```bash
https://gis-talk-bot-v2-dmqsafdomn.now.sh/ask
```

Et voila!
