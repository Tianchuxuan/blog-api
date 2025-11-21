const Message = require('../models/Message');

exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Name, email and message are required');
    }
    
    const newMessage = await Message.create({
      name,
      email,
      message,
    });
    
    res.status(201).json({
      message: 'Message received successfully',
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
