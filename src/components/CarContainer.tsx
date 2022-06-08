import { useTheme } from "vcc-ui";
import Car from "../interfaces/Car";
import styles from "../styles/slider.module.scss";

const CarContainer = ({ car }: { car: Car }) => {
  const theme = useTheme();
  return (
    <div className={styles.card}>
      <p style={{ color: theme.color.foreground.secondary }}>{car.bodyType}</p>
      <h4 style={{ color: theme.color.foreground.primary }}>
        {car.modelName}
        <span style={{ color: theme.color.foreground.secondary }}>
          {" "}
          {car.modelType}
        </span>
      </h4>
      <img className={styles.carImage} src={car.imageUrl} />
      <div className={styles.btnContainer}>
        <a
          href={`/learn/${car.id}`}
          style={{ color: theme.color.foreground.action }}
          className={styles.btn}
        >
          Learn <img alt="learn-more" height="12" src="/images/chevron-small.svg" />
        </a>
        <a
          href={`/shop/${car.id}`}
          style={{ color: theme.color.foreground.action }}
          className={styles.btn}
        >
          Shop <img alt="shop" height="12" src="/images/chevron-small.svg" />
        </a>
      </div>
    </div>
  );
};

export default CarContainer;
