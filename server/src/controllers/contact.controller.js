const Contact = require('../models/Contact');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for getting in touch! Your message has been received.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact
};
