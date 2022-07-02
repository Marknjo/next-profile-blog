import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { ButtonAttributes } from '../../../types';
import { Button } from '../../ui';
import styles from './Contact.module.css';

const submitContactDetails = async (details: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const submitResponse = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json; charset="utf-8"',
      },
    });

    const responseMessage = await submitResponse.json();

    if (!submitResponse.ok && responseMessage.status !== 'success') {
      const message =
        responseMessage.data.message ??
        `Submission error ${submitResponse.status}, please try later`;

      throw new Error(message);
    }

    return responseMessage;
  } catch (error) {
    throw error;
  }
};

const Contact = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [formErrors, setFormErrors] = useState('');

  useEffect(() => {
    if (formErrors) {
      const timer = setTimeout(() => setFormErrors(''), 15000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [formErrors]);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      // Validate form inputs
      console.log(enteredEmail, enteredName, enteredMessage);
      if (
        enteredEmail !== '' &&
        !enteredEmail.includes('@') &&
        enteredName !== '' &&
        enteredMessage !== ''
      ) {
        throw new Error(
          'One of the form field is empty or contains invalid characters. Please fix and submit again'
        );
      }
      // submit form values
      await submitContactDetails({
        name: enteredName.trim(),
        email: enteredEmail.trim(),
        message: enteredMessage.trim(),
      });

      // Reset form fields if successful
      setEnteredName('');
      setEnteredEmail('');
      setEnteredMessage('');
      setFormErrors('');
    } catch (error: any) {
      // handle error cases
      setFormErrors(error.message);
    }
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredName(event.target.value);
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const messageChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredMessage(event.target.value);
  };

  const closeErrorBoxHandler = () => {
    setFormErrors('');
  };

  return (
    <section className={styles.contact} onSubmit={submitHandler}>
      <h1>How can I help you?</h1>
      {formErrors && (
        <div className={styles['form-error']} onClick={closeErrorBoxHandler}>
          <p>Error: {formErrors}</p>
        </div>
      )}
      <form className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={enteredName}
              onChange={nameChangeHandler}
              required
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              required
            />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Your Message:</label>
          <textarea
            name="message"
            value={enteredMessage}
            onChange={messageChangeHandler}
            id="message"
            placeholder="Send me your message... "
            rows={5}
            required
          ></textarea>
        </div>

        <div className={styles.actions}>
          <Button type={ButtonAttributes.SUBMIT}>Send Message</Button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
