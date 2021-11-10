/**
 * message routes
 */

 'use strict';

 const msgCtrl = require('../controllers/message.controller');
 const build = require('../utils/controller-factory');
 const router = require('express').Router();
 const K = require('../constants');
 
router.get(
   '/message',
   build(msgCtrl.messageList)
);

router.post(
   '/message',
   build(msgCtrl.createMessage)
 );

// router.get(
//    '/mb/list-topics',
//    validation.topicMobileList,
//    build(topicCtrl.topicList)
// );

// router.get(
//    '/list-admin-topics',
//    verifyService.verify,
//    acl(K.COMMON.TOPIC.API.ADMIN_TOPIC_LIST.TITLE, K.ROLE.ADMIN, K.ROLE.WEB_STAFF, K.ROLE.BRAND_REP, K.ROLE.CS_STAFF),
//    validation.topicList,
//    build(topicCtrl.adminTopicList)
// );


// router.put(
//    '/edit-topic/:topicId',
//    verifyService.verify,
//    acl(K.COMMON.TOPIC.API.TOPIC_EDIT.TITLE, K.ROLE.ADMIN, K.ROLE.WEB_STAFF, K.ROLE.BRAND_REP, K.ROLE.CS_STAFF),
//    validation.topicEdit,
//    build(topicCtrl.topicEdit)
// );

// router.delete(
//    '/delete-topic/:topicId',
//    verifyService.verify,
//    acl(K.COMMON.TOPIC.API.TOPIC_DELETE.TITLE, K.ROLE.ADMIN, K.ROLE.WEB_STAFF, K.ROLE.BRAND_REP, K.ROLE.CS_STAFF),
//    validation.topicDelete,
//    build(topicCtrl.topicDelete)
//  );

 module.exports = router;
 