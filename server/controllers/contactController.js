import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import { getDbStatus } from '../config/db.js';

// Standby memory store used only when MongoDB connection is offline
const inMemoryContacts = [];

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Build contact record
    const contactPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject && subject.trim() ? subject.trim() : 'Portfolio Contact Inquiry',
      message: message.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
      createdAt: new Date(),
    };

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      // 1. Live MongoDB Persistence via Mongoose
      const contactDoc = new Contact(contactPayload);
      const savedContact = await contactDoc.save();

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been saved to the database successfully. I will get back to you shortly.',
        data: {
          id: savedContact._id,
          name: savedContact.name,
          email: savedContact.email,
          createdAt: savedContact.createdAt,
        },
      });
    } else {
      // 2. Standby Memory Queue (when MongoDB connection is offline/unavailable)
      const fallbackContact = {
        _id: 'queue_' + Date.now(),
        ...contactPayload,
        _inMemory: true,
      };
      inMemoryContacts.unshift(fallbackContact);

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received successfully. I will get back to you shortly.',
        data: {
          id: fallbackContact._id,
          name: fallbackContact.name,
          email: fallbackContact.email,
          createdAt: fallbackContact.createdAt,
        },
        notice: 'Stored in standby server memory queue. To persist permanently in MongoDB, configure MONGODB_URI in server/.env.',
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all submitted contact messages
 * @route   GET /api/contact
 * @access  Public (for administrative inspection and testing)
 */
export const getContacts = async (req, res, next) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        source: 'MongoDB',
        count: contacts.length,
        data: contacts,
      });
    } else {
      return res.status(200).json({
        success: true,
        source: 'Standby Server Memory Queue',
        count: inMemoryContacts.length,
        notice: 'MongoDB is offline. Showing messages from server memory queue.',
        data: inMemoryContacts,
      });
    }
  } catch (error) {
    next(error);
  }
};
