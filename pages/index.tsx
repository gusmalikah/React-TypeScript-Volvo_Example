import {server} from '../config/index';
import DisplaySlider from '../src/components/DisplaySlider';
import Car from '../src/interfaces/Car';
import { StyleProvider, ThemePicker } from "vcc-ui";

const Home = ({cars}:{cars: Car[]}) => {
    return(
      <StyleProvider>
        <ThemePicker variant="light">
          <DisplaySlider cars={cars} />
        </ThemePicker>
      </StyleProvider>
    );
}

export const getStaticProps = async () => {
    const cars:Car[] = await (await fetch(`${server}/api/cars.json`)).json();
    return{
      props: {
        cars,
      }
    }
}

export default Home;