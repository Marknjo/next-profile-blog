import { ButtonAttributes } from '../../../types';
import { Button } from '../../ui';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="name">Your Name:</label>
            <input type="text" name="name" id="name" required />
          </div>

          <div className={styles.control}>
            <label htmlFor="email">Your Email:</label>
            <input type="text" name="email" id="email" required />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Your Message:</label>
          <textarea
            name="message"
            id="message"
            placeholder="Send me your message... "
            rows={5}
            required
          >
            {' '}
          </textarea>
        </div>

        <div className={styles.actions}>
          <Button type={ButtonAttributes.SUBMIT}>Send Message</Button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
