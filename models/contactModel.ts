import mongoose from 'mongoose';

const { Schema, model } = mongoose;

interface ContactModelSchema {
  name: string;
  email: string;
  message: string;
}

const contactSchema = new Schema<ContactModelSchema>(
  {
    name: {
      type: String,
      required: [true, 'Contact form must have a name field'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Contact form must have an email field'],
      trim: true,
      validate: {
        validator: function (val: string) {
          return val.includes('@');
        },
        message: 'Invalid email format. Please use a valid email address',
      },
    },
    message: {
      type: String,
      required: [true, 'Contact must have a message field'],
      maxLength: [1000, 'Message must not exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/// Model
const Contact = model('Contact', contactSchema);

export default Contact;
