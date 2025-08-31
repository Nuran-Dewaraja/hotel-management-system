const express = require('express');
const router = express.Router();
const notificationModel = require('../Model/notificationModel')
const notificationController = require('../Controlers/notificationController')

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
