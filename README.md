# gis-talk-bot
[This project](https://devpost.com/software/gis-talk-bot) has been developer during the Esri Hackathon during 25th and 26th of January 2018.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Bot](#bot)
  - [Live Demo](#live-demo)
  - [Setup](#setup)
    - [Create DialogFlow agent](#create-dialogflow-agent)
    - [Create and link a Telegram bot](#create-and-link-a-telegram-bot)
    - [Run and link your webhook](#run-and-link-your-webhook)
    - [Talk to you Telegram bot](#talk-to-you-telegram-bot)
- [Attachment viewer](#attachment-viewer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Bot

This is our attempt from ESRI Spain DevRel Team to try to help our users to find ESRI content and people quickly.

## Live Demo

Bot versions:
* [Telegram](https://web.telegram.org/#/im?p=@GISTalkBot) (**Recommended**)
* HTML5 (*Pending*)

> The HTML5 do not support enriched text so links won't be clickable

## Setup

### Create DialogFlow agent

[Watch this video](https://www.youtube.com/watch?v=gqyyDOrtFeU&index=1&list=PLVfQL04Y8hoLS6MPE74WtQ3sSaD_SFyHU) to learn how to create a DialogFlow agent and setup the [initial configuration](../raw_data/backup_bot_conf/GISTalkBot_26_01_2018_03_41.zip).

### Create and link a Telegram bot

DialogFlow allow you to integrate several services: Telegram, Slack, Cortana, Alexa, ...

To learn how to integrate DialogFlow with a Telegram bot what these videos:

* [Create Telegram Bot and link it to Dialog Flow](https://www.youtube.com/watch?v=2LTFRPoTt9k&index=2&list=PLVfQL04Y8hoLS6MPE74WtQ3sSaD_SFyHU) (using the [Telegram @BotFather](https://web.telegram.org/#/im?p=@BotFather))
* [Set Telegram Bot Description](https://www.youtube.com/watch?v=_JqdFu0Fwj0&index=3&list=PLVfQL04Y8hoLS6MPE74WtQ3sSaD_SFyHU)

### Run and link your webhook

Learn how to do that [here](./bot_webhook)

### Talk to you Telegram bot

[How to start a conversation with your Telegram Bot
](https://www.youtube.com/watch?v=jPU0-KWVS8E&list=PLVfQL04Y8hoLS6MPE74WtQ3sSaD_SFyHU&index=4)

Accepted terms:

* *Pending*

# Attachment viewer

This app is meant to help users to explore attachments inside a feature service.

It will be use to

[Learn more](./attachment-viewer/README.md)
