import { Avatar, Button, Divider, Image, Rate } from "antd";
import styles from "../Listing.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faFlushed,
  faHeart,
  faMap,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faker } from "@faker-js/faker";
import LocationMap from "../components/LocationMap/LocationMap";

export default function Listing() {
  const reviews = Array(5)
    .fill(null)
    .map((data, i) => ({
      userName: faker.person.firstName() + " " + faker.person.lastName(),
      userImage: faker.image.avatar(),
      rating: faker.datatype.float({ min: 1, max: 5 }).toFixed(1),
      review: faker.lorem.sentences(),
      date: faker.date.anytime(),
    }));

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.core}>
          <div className={styles.image}>
            <Image src={faker.image.url()} alt="placeholder" />
          </div>
          <div className={styles.intro}>
            <div className={styles.intro__main}>
              <span className={styles.category}>Category</span>
              <h1 className={styles.title}>
                Some Title Example Goes Here Yatch Or Some
              </h1>
              <span className={styles.ratings}>
                <span className={styles.ratings__number}>4.5</span>
                <Rate disabled defaultValue={4} />
                <span className={styles.ratings__count}>(23)</span>
              </span>
            </div>
            <div className={styles.intro__rest}>
              <span className={styles.location}>
                <span>
                  <FontAwesomeIcon icon={faMap} />
                </span>
                <span>Toronto</span>
                <span className={styles.location__distance}>(32km)</span>
              </span>
              <span className={styles.price}>
                <span className={styles.price__amount}>
                  $48<span className={styles.price__amount_cent}>.90</span>
                </span>
                <span className={styles.price__text}>/ day</span>
              </span>
              <div className={styles.intro__rest_actions}>
                <Button size="large" type="primary" href="/checkout">
                  Rent Now
                </Button>
                <Button size="large">Contact User</Button>
              </div>
            </div>
          </div>
          <div className={styles.quickActions}>
            <span
              className={`${styles.quickActions__item} ${styles.quickActions__item_report}`}
            >
              <FontAwesomeIcon icon={faFlushed} />
            </span>
            <span className={styles.quickActions__item}>
              <FontAwesomeIcon icon={faHeart} />
              Mark Favourite
            </span>
          </div>
        </div>
        <div className={styles.rest}>
          <div className={styles.info}>
            <div className={styles.images}>
              {[0, 1, 3].map((item, i) => {
                return (
                  <span className={styles.images__item} key={i}>
                    <Image
                      src={faker.image.url()}
                      preview={false}
                      alt="product"
                    />
                  </span>
                );
              })}
            </div>
            <div className={styles.seller}>
              <div className={styles.seller__core}>
                <span className={styles.seller__id}>
                  <Avatar icon={<FontAwesomeIcon icon={faUser} />} />
                  <span>Sifat Dipta</span>
                  <span className={styles.seller__id_verified}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                </span>
                <span className={styles.seller__level}>Level One</span>
              </div>
              <div className={styles.seller__more}>
                <span className={styles.seller__more_item}>
                  <span className={styles.seller__more_item_key}>Ratings</span>
                  <span className={styles.ratings}>
                    <span className={styles.ratings__number}>4.5</span>
                    <FontAwesomeIcon icon={faStar} />
                    <span className={styles.ratings__count}>(343)</span>
                  </span>
                </span>
                <span className={styles.seller__more_item}>
                  <span className={styles.seller__more_item_key}>City</span>
                  <span className={styles.location}>
                    <span>
                      <FontAwesomeIcon icon={faMap} />
                    </span>
                    <span>Toronto</span>
                    <span className={styles.location__distance}>(32km)</span>
                  </span>
                </span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet accumsan arcu. Sed sit amet accumsan arcu.
              </p>
              <Button type="dashed" size="large">
                View Full Profile
              </Button>
            </div>
            <LocationMap />
          </div>
          <div className={styles.details}>
            <div className={styles.description}>
              <span className={styles.description__core}>
                <h3 className={styles.description__title}>Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet accumsan arcu. Sed sit amet accumsan arcu.
                </p>
              </span>
              <span className={styles.description__highlights}>
                <h3 className={styles.description__title}>Highlights</h3>
                <ul>
                  <li>TGhis is something</li>
                  <li>Another One Test</li>
                  <li>Min of three req</li>
                </ul>
              </span>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={styles.reviews}>
              <h3 className={styles.reviews__title}>Reviews</h3>
              <div className={styles.reviews__list}>
                {reviews.map((review) => (
                  <ReviewItem
                    key={review.userName}
                    userName={review.userName}
                    userImage={review.userImage}
                    rating={review.rating}
                    review={review.review}
                    date={review.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
