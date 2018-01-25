# What this is all about

This is our attempt from ESRI Spain DevRel Team to try to help our users to find ESRI content and people quickly.

# Concepts

Please look at the [docs](docs/index.md) :-)

# How to contribute

Please read the [contributing guidelines](CONTRIBUTE.md).

## Prerequisites

### NGROK

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

### NodeJS

version 8.4.0 or above.

# How to run

First of all, clone this project;

In the folder you have cloned it , type :

```bash
npm i
```



## Development mode

You can start develop just running:

```bash
BOT_MODE="development"   node bin/www
```

If you need to watch what is happening , you can also use :

```bash
BOT_MODE="development"  DEBUG=* node bin/www
```

If you need to put some break points,

```bash
BOT_MODE="development"  --inspect-brk node bin/www
```

Now open [chrome://inspect](chrome://inspect) , and you will see an instance of your running program for debugging



## Production mode

```bash
BOT_MODE="prod" BOT_SECRET="comeon" BOT_HEADER="esri-chat"  node  bin/www
```



## WHAT THOSE ENVIRONMENT VARIABLES MEAN

- **BOT_MODE** : Indicates which mode you are on. Some security checks are skipped in **development mode**
- **BOT_HEADER** : *Dialogflow* lets you add some http headers for communication between dialogflow and the backend fullfillment program. This enhance security and avoids consuming your backend from other machines.
- **BOT_SECRET** : the value your **BOT_HEADER** will have . If it doesn't match with the fullfillment settings on *Dialogflow* , it won't work , and you will see an **502 Bad Gateway** or other similar error in your chat.
