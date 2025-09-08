import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';
import PropTypes from 'prop-types';

const BookingForm = ({ camper }) => {
  // single booking date as in the mock
  const [bookingDate, setBookingDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!camper || !camper.name) {
      alert('Camper information is missing.');
      return;
    }
    // Minimal confirm action for now
    alert(`Booking requested for ${camper.name} on ${bookingDate.toDateString()}`);
  };

  return (
    <div className={styles.bookingForm}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id="name"
          className={styles.input}
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  {/* labels removed — placeholders are shown inside inputs */}
        <div className={styles.dateWrapper}>
          <DatePicker
            id="bookingDate"
            className={styles.input}
            selected={bookingDate}
            onChange={(date) => setBookingDate(date)}
            placeholderText="Booking date*"
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>
        <textarea
          id="comment"
          className={styles.textarea}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.confirm}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  camper: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default BookingForm;
