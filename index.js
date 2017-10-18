'use strict'

const bot = require('watsonworkspace-bot')
const logger = require('winston')
const ww = require('watsonworkspace-sdk')

ww.logger.level = 'info'  // the watsonworkspace-sdk logger's level
logger.level = 'info'  // this bot's logger level

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

bot.webhooks.on('message-annotation-added', (message, annotation) => {
  const annotationType = message.annotationType

  logger.info(`Received message-annotation-added:${annotationType}`)
  logger.debug(message)
  logger.debug(annotation)

  // fetch the full message with content using the watsonworkspace-sdk
  ww.getMessage(message.messageId, ['id', 'content', 'annotations'])
  .then(message => {
    // do something awesome
  })
  .catch(error => logger.error(error))
})

bot.webhooks.on(`actionSelected`, (message, annotation) => {
  // get the original message that created this actionSelected annotation
  const referralMessageId = annotation.referralMessageId
  const userId = message.userId
  const actionId = annotation.actionId

  logger.info(`${actionId} selected from message ${referralMessageId} by user ${userId}`)
  logger.debug(message)
  logger.debug(annotation)

  let buttons = [
    ww.ui.button('submit-action', 'Submit'),
    ww.ui.button('cancel-action', 'Cancel')
  ]

  const dialog = ww.ui.generic('This is Action Fulfillment.', 'In action ...', buttons)

  // create the action fulfillment dialog in Workspace
  ww.sendTargetedMessage(userId, annotation, dialog)
})

// the most important part - start the bot so it listens for Workspace events
bot.start()
