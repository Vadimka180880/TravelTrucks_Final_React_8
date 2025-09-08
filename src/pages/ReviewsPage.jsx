import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const { id } = useParams();
  const camper = useSelector((state) =>
    state.campers.items.find((item) => item.id === id)
  );

  if (!camper) return <div>Camper not found</div>;

  return (
    <div className={styles.reviewsPage}>
        <h2>Reviews for {camper.name}</h2>
            {camper.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div className={styles.avatar} aria-hidden>
                    {review.reviewer_name ? review.reviewer_name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <div className={styles.reviewerName}>{review.reviewer_name}</div>
                    <div className={styles.reviewMeta}>Rating: {'⭐'.repeat(review.reviewer_rating)}</div>
                  </div>
                </div>
                <p className={styles.reviewText}>{review.comment}</p>
              </div>
            ))}
    </div>
  );
};

export default ReviewsPage;