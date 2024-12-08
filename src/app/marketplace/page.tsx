import { Checkbox, Pagination, Rate, Select, Slider } from "antd";
import styles from "./Marketplace.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Listing from "@/components/Listing/Listing";
import { faker } from "@faker-js/faker";
import SponsoredListing from "@/components/SponsoredListing/SponsoredListing";
import FilterItem from "./components/FilterItem";

export default function Marketplace() {
  const listings = Array(9)
    .fill(null)
    .map((data, i) => ({
      title: faker.commerce.productName(),
      images: [faker.image.url(), faker.image.url(), faker.image.url()],
      price: faker.commerce.price(),
      rating: faker.datatype.float({ min: 1, max: 5 }).toFixed(1),
      category: faker.commerce.department(),
      location: faker.location.city(),
      distance: faker.datatype.float({ min: 1, max: 10 }),
      userName: faker.person.firstName() + " " + faker.person.lastName(),
      userImage: faker.image.avatar(),
      badge: i === 2 ? "Top Seller" : "",
      sponsored: i === 1 || i === 5 ? true : false,
    }));

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.core}>
          <div className={styles.filter}>
            <div className={styles.filter__header}>
              <h3>Filters</h3>
              <span className={styles.filter__header_clear}>Clear All</span>
            </div>
            <div className={styles.filter__item}>
              <FilterItem title="Category">
                <div className={styles.filter__item_list}>
                  <Checkbox>Videography</Checkbox>
                  <Checkbox>Yatch</Checkbox>
                  <Checkbox>Clothings</Checkbox>
                </div>
              </FilterItem>
            </div>
            <div className={styles.filter__item}>
              <FilterItem title="Price">
                <div className={styles.filter__item_data}>
                  <Slider
                    range
                    defaultValue={[450, 700]}
                    min={150}
                    max={1500}
                  />
                </div>
              </FilterItem>
            </div>
            <div className={styles.filter__item}>
              <FilterItem title="Ratings">
                <div className={styles.filter__item_data}>
                  <Rate />
                </div>
              </FilterItem>
            </div>
            <div className={styles.filter__item}>
              <FilterItem title="Aquire By">
                <div className={styles.filter__item_list}>
                  <Checkbox>Delivery</Checkbox>
                  <Checkbox>Pickup</Checkbox>
                </div>
              </FilterItem>
            </div>
            <div className={styles.filter__item}>
              <FilterItem title="Distance">
                <div className={styles.filter__item_data}>
                  <Slider defaultValue={50} max={150} />
                </div>
              </FilterItem>
            </div>
          </div>
          <div className={styles.listings}>
            <div className={styles.listings__header}>
              <h3 className={styles.listings__header_title}>
                Search results for{" "}
                <span className={styles.listings__header_term}>SLR Camera</span>{" "}
                <span className={styles.listings__header_count}>
                  (12 of 1,343)
                </span>
              </h3>
              <Select
                defaultValue="Sort By"
                style={{ width: 180 }}
                suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                options={[
                  { value: "Distance", label: "Distance" },
                  { value: "Price Highest", label: "Price Highest" },
                  { value: "Price Lowest", label: "Price Lowest" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
                size="large"
              />
            </div>
            <div className={styles.listings__ads}>
              <div className={styles.listings__ad}>
                <SponsoredListing
                  title="XYZ Yatch 2.0"
                  subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae."
                  price={"99.99"}
                  rating={"4.9"}
                  category="Yatch"
                  city="Toronto"
                  images={[
                    faker.image.url(),
                    faker.image.url(),
                    faker.image.url(),
                    faker.image.url(),
                    faker.image.url(),
                  ]}
                />
              </div>
            </div>
            <div className={styles.listings__items}>
              {listings.map((listing, index) => (
                <Listing
                  key={index}
                  title={listing.title}
                  images={listing.images}
                  price={listing.price}
                  rating={listing.rating}
                  category={listing.category}
                  location={listing.location}
                  distance={listing.distance}
                  userName={listing.userName}
                  userImage={listing.userImage}
                  badge={listing.badge}
                  sponsored={listing.sponsored}
                />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
