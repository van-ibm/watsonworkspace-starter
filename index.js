'use strict'

const logger = require('winston')

// creates a bot server with a single bot
const botFramework = require('watsonworkspace-bot')
botFramework.level('info')
botFramework.startServer()

const bot = botFramework.create() // bot settings defined by process.env
bot.authenticate()

const UI = require('watsonworkspace-sdk').UI

/*
 * Webhook event examples:
 * 'message-created'
 * 'message-annotation-added'
 * 'message-focus'
 * 'message-focus:ActionRequest'
 * 'message-focus:ActionRequest:Schedule'
 * 'message-focus:Question'
 * 'message-focus:Commitment'
 * 'actionSelected'
 * 'actionSelected:someActionId'
 */

bot.on('message-annotation-added', (message, annotation) => {
  const annotationType = message.annotationType

  logger.info(`Received message-annotation-added:${annotationType}`)
  logger.debug(message)
  logger.debug(annotation)

  // fetch the full message with content using the watsonworkspace-sdk
  bot.getMessage(message.messageId, ['id', 'content', 'annotations'])
  .then(message => {
    // do something awesome
  })
  .catch(error => logger.error(error))
})

bot.on(`actionSelected`, (message, annotation) => {
  // get the original message that created this actionSelected annotation
  const referralMessageId = annotation.referralMessageId
  const userId = message.userId
  const actionId = annotation.actionId

  logger.info(`${actionId} selected from message ${referralMessageId} by user ${userId}`)
  logger.debug(message)
  logger.debug(annotation)

  let buttons = [
    UI.button('submit-action', 'Submit'),
    UI.button('cancel-action', 'Cancel')
  ]

  const dialog = UI.generic('This is Action Fulfillment.', 'In action ...', buttons)

  // create the action fulfillment dialog in Workspace
  bot.sendTargetedMessage(userId, annotation, dialog)
})
