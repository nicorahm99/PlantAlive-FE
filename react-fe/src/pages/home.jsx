import React from 'react';
import PlantCard from '../components/PlantCard';
import AppNavigation from '../components/AppNavigation';
import {useHistory} from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  // const [plants, setPlants] = React.useState([]);
  const testArray = Array.from(Array(15).keys())

  const mockPlantCard = (index) => {
    return (<PlantCard 
      key={index}
      src="../images/samplePlant.svg" 
      location="Wohnzimmer" 
      plantName="Schefflera"
      humidity={80} 
      temperature={21}
      onEdit={() => {
        history.push('/detail')
      }}
    />)
  }

  return (
      <AppNavigation>
        <div className="pageHome_cardContainer">
          {testArray.map((index) => {
            return mockPlantCard(index)
          })}
        </div>
      </AppNavigation>
  );
}

