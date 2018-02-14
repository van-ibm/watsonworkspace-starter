'use strict'

const logger = require('winston')

// creates a bot server with a single bot
const botFramework = require('watsonworkspace-bot')
botFramework.level('verbose')

botFramework.startServer()

const bot = botFramework.create() // bot settings defined by process.env


const UI = require('watsonworkspace-sdk').UI

/**
 * your code below
 */

 // any change will do

// slash commands or action fulfillment
bot.on(`actionSelected`, (message, annotation, params) => {
  // get the original message that created this actionSelected annotation
  const referralMessageId = annotation.referralMessageId
  const userId = message.userId
  const actionId = annotation.actionId

  logger.info(`${actionId} selected from message ${referralMessageId} by user ${userId}`)
  logger.debug(message)
  logger.debug(annotation)
})

const spaceId = '5a848b74e4b00ff4fdb9f52e'

// send a simple message as a bot
bot.authenticate()
// .then(token => {
//   bot.sendMessage(spaceId, 'Hello World!')
// })

// send a simple message as a user 
bot.on('oauth', userId => {
  bot.asUser(userId).sendMessage(spaceId, 'Hello World!')
})

// handle the message-created webhook
bot.on('message-created', (message, annotation) => {
  if(message.content.includes('Hello')) {
    bot.addMessageFocus(message, 'Hello', 'Greeting', 'hello', 'Greet the Space')
  }
})

// handle a message focus
bot.on('actionSelected:Greet the Space', (message, annotation) => {
  const buttons = [
    UI.button('greet-space-action', 'Greet Space')
  ]
  const dialog = UI.generic('Would you like to greet the space?', '(that would be nice of you)', buttons)
  bot.sendTargetedMessage(message.userId, annotation, dialog)
})


// handle a button
bot.on('actionSelected:greet-space-action', (message, annotation) => {
  bot.sendMessage(message.spaceId, `Hello everyone, great day isn't it?`)
  .then(responseMessage => {
    bot.sendTargetedMessage(message.userId, annotation, UI.generic('Greeting sent', ''))
  })
})

bot.on('actionSelected:/starter', (message, annotation, params) => {
  bot.sendMessage(message.spaceId, `${params[0]} everyone, great day isn't it?`)
})
