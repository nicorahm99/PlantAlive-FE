import React, { useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import AppNavigation from '../components/AppNavigation';
import {useHistory} from 'react-router-dom';
import { buildGetRequest } from '../commons/fetches';
import WelcomeInsert from '../components/WelcomInsert';
import { getUserDataFromStorage } from '../commons/utils';
import Icon from '../components/Icon';


export default function Home() {
  const history = useHistory();

  const [plants, setPlants] = React.useState(null);
  const userData = getUserDataFromStorage();

  const fetchPlants = async () => {
    const request = buildGetRequest(`/plants/fromUser/${userData.id}`)
    const responseBody = await (await request()).json()
    setPlants(responseBody)
  }

  useEffect(() => {
    fetchPlants()    
  // eslint-disable-next-line
  },[])

  const getContent = () => {
    if (plants === null){
      return (<h1 style={{color: "black"}}>Backend nicht gefunden ... 404</h1>)
    } else if (plants.length === 0){
      return (<WelcomeInsert name={userData.name} />)
    }
    return(   
      <div>
        {plants.map((plant, index) => {
          return renderPlantCard(plant, index)
        })}
      </div>) 
  }
  const renderPlantCard = (plant) => {
    return (<PlantCard 
      key={plant.id}
      id={plant.id}
      src="../images/samplePlant.svg" 
      location={plant.location} 
      plantName={plant.name}
      humidity={plant.currentHumidity} 
      temperature={plant.temperature}
      onEdit={() => {
        history.push(`/detail/${plant.id}`)
      }}
    />)
  }

  if (!userData.id){
    history.push('/')
  }

  return (
      <AppNavigation>
        <div className="pageHome_cardContainer">
          {getContent()}
        </div>
        <div className="pageHome_flotingActionButton" onClick={() => history.push("/new")} >
            <Icon iconName="add"/>
        </div>
      </AppNavigation>
  );
}

