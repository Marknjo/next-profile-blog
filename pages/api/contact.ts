// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanitizeHtml from 'sanitize-html';
import Contact from '../../models/contactModel';

type Data = {
  status: string;
  data: {
    message: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      // Get body
      const { name, email, message } = req.body as {
        name: string;
        email: string;
        message: string;
      };

      // Validate
      if (
        email !== '' &&
        !email.includes('@') &&
        name !== '' &&
        message !== '' &&
        message.length > 1000
      ) {
        throw new Error(
          'One of the form field is empty or contains invalid characters. Please fix and submit again'
        );
      }

      const sanitizedMessage = sanitizeHtml(message);

      // Connect to database
      try {
        await Contact.create({ name, email, message: sanitizedMessage });
      } catch (error) {
        throw error;
      }

      // Save the message

      // return success message
      res.status(200).json({
        status: 'success',
        data: {
          message:
            'Your message was submitted successfully. I will contact you soon 😃😃😃',
        },
      });
    } catch (error: any) {
      console.log(error);

      res.status(500).json({
        status: 'error',
        data: {
          message: 'Server error. Please try again later',
        },
      });
    }
  }
}
