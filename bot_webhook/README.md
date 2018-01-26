# Bot Webhook

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  

- [Development mode](#development-mode)
  - [Prerequisites](#prerequisites)
    - [NodeJS](#nodejs)
    - [NGROK](#ngrok)
  - [How to run](#how-to-run)
- [Production mode](#production-mode)
  - [Deploy to the cloud](#deploy-to-the-cloud)
- [Environment variables](#environment-variables)
- [Linking DialogFlow to your Webhook](#linking-dialogflow-to-your-webhook)
- [How to contribute](#how-to-contribute)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Development mode

## Prerequisites

### NodeJS

You will need to install [NodeJS](https://nodejs.org/en) version 8.4.0 or above.

> We recommend you to use [Node Version Manager](https://github.com/creationix/nvm/blob/master/README.md#node-version-manager---), if you have it installed just run: `$s nvm install v8.4.0`

### NGROK

To be more productive we encourage you to install [ngrok](https://ngrok.com/download) in your computer. **ngrok** let's your machine be Internet reachable thru a tunneled connection, just with one command :

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

You can also log, replay & check the status of all connections at [http://localhost:4040](http://localhost:4040)

> **TIP**:
Once you've downloaded it , unzip it , and move **ngrok** to **/usr/local/bin** folder , letting you run this command from anywhere (or add the Windows PATH environment variable)

## How to run

First of all, clone this project;

In the folder you have cloned it , type :

```bash
npm i
```

Now you are ready to start developing just running:

```bash
BOT_MODE="development" node bin/www
```

If you need to watch what is happening , you can also use :

```bash
BOT_MODE="development" DEBUG=* node bin/www
```

If you need to put some break points,

```bash
BOT_MODE="development" --inspect-brk node bin/www
```

Now open [chrome://inspect](chrome://inspect) , and you will see an instance of your running program for debugging

# Production mode

Watch this video: [Webhook installation](https://asciinema.org/a/ebc6H7tCId7vZMH3ZOhisJRVn)

```bash
BOT_MODE="prod" BOT_SECRET="comeon" BOT_HEADER="esri-chat"  node  bin/www
```

## Deploy to the cloud

*Pending*

# Environment variables

- **BOT_MODE**: Indicates which mode you are on. Some security checks are skipped in **development mode**
- **BOT_HEADER**: *Dialogflow* lets you add some http headers for communication between dialogflow and the backend fullfillment program. This enhance security and avoids consuming your backend from other machines.
- **BOT_SECRET**: the value your **BOT_HEADER** will have . If it doesn't match with the fullfillment settings on *Dialogflow* , it won't work , and you will see an **502 Bad Gateway** or other similar error in your chat.

# Linking DialogFlow to your Webhook

First of all you need to [setup your bot](../#bot-setup).

*Pending*

# How to customize your webhook

Please read the [contributing guidelines](CONTRIBUTE.md).
