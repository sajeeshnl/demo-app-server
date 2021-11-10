"use strict";

const messageService = require('../services/message.service');

class messageController {
  constructor() { }

  async createMessage(params) {
    try {
      const messageData = await messageService.createMessage(params);
      return { "message_id": messageData.rows[0]?.message_id };
    } catch (err) {
      throw err;
    }
  }

  async messageList(params) {
    try {
      const messageData = await messageService.getData(params);
      return messageData.rows[0].json_build_object;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new messageController()