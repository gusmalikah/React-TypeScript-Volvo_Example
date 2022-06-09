import Car from "../interfaces/Car";
import CarContainer from "./CarContainer";
import styles from "../styles/slider.module.scss";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { SelectInput } from "vcc-ui";

const DisplaySlider = ({ cars }: { cars: Array<Car> }) => {

  const uniqueBodyTypes = Object.keys(cars.reduce((a:any,{bodyType}:{bodyType:string})=>{
    a[bodyType] = {bodyType};
    return a;
  },{}));

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [displayedCars, setDisplayedCars] = useState<Array<Car>>(cars);
  const [filterValue, setFilterValue] = useState<string>("All");

  useEffect(() => {
    const slider = document.getElementById("slider") as Element;
    slider.scrollLeft = 0;
  }, []);

  const previous = (e:MouseEvent) => {
    if (!e.detail || e.detail == 1) {
      const slider = document.getElementById("slider") as Element;
      slider.scrollLeft = slider.scrollLeft - slider.clientWidth * 0.25;
    }
  };

  const next = (e:MouseEvent) => {
    if (!e.detail || e.detail == 1) {
      const slider = document.getElementById("slider") as Element;
      slider.scrollLeft = slider.scrollLeft + slider.clientWidth * 0.25;
    }
  };

  const scrollHandler = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      const slider = document.getElementById("slider") as Element;
      const currentSlide = Math.round(
        (slider.scrollLeft / (slider.clientWidth* 0.85)) 
      );
      setCurrentSlide(currentSlide);
    }
  };

  const handleFilter = (e:ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    let filteredCars = cars;
    if(value !== "all"){
      filteredCars = cars.filter((car) => car.bodyType === value);
    } 
    setDisplayedCars(filteredCars);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterBar}>
        <SelectInput name="bodyType" label="Body Type" value={filterValue} onChange={handleFilter}>
          <option value="All">All</option>
          {uniqueBodyTypes.map((option, index) => <option key={index} value={option[0].toUpperCase() + option.slice(1)}>{option[0].toUpperCase() + option.slice(1)}</option>)}
        </SelectInput>
      </div>
      <div className={styles.slider} id="slider" onScroll={scrollHandler}>
        {displayedCars.map((car) => <CarContainer car={car} key={car.id} />)}
      </div>
      {/* buttons for user to manually control the slides*/}
      <div className={styles.mainBtnContainer}>
        <button onClick={previous}>
          <img
           style={{ transform: "rotate(180deg)" }}
            width="40"
            alt="previous-slide"
            src="/images/chevron-circled.svg"
          />
        </button>
        <button onClick={next}>
          <img width="40" alt="next-slide" src="/images/chevron-circled.svg" />
        </button>
      </div>
      {/* rendering the circles that showcase current slide position*/}
      <div className={styles.sliderCircles}>
        {displayedCars.map((car, i) => {
          let img = <img key={i} src="/images/inactive_circle.svg"/>;
          if(i === currentSlide){
            img = <img key={i} src="/images/active_circle.svg"/>;
          } 
          return img;
        })}
      </div>
    </div>
  );
};

export default DisplaySlider;
