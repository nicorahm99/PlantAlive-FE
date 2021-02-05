import React, { useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import AppNavigation from '../components/AppNavigation';
import {useHistory} from 'react-router-dom';
import { buildGetRequest } from '../commons/fetches';
import WelcomeInsert from '../components/WelcomInsert';
import { getUserDataFromStorage } from '../commons/utils';
import {Fab} from '@material-ui/core';
import Icon from '../components/Icon';


export default function Home() {
  const history = useHistory();

  const [plants, setPlants] = React.useState(null);
  const userData = getUserDataFromStorage();

  useEffect(() => {
    fetchPlants()
  },[])


  const fetchPlants = async () => {
    const request = buildGetRequest(`/plants/fromUser/${userData.id}`)
    const responseBody = await (await request()).json()
    setPlants(responseBody)
  }

  const getContent = () => {
    if (plants === null){
      return null
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
  const renderPlantCard = (plant, index) => {
    return (<PlantCard 
      key={index}
      src="../images/samplePlant.svg" 
      location={plant.location} 
      plantName={plant.name}
      humidity={plant.humidity} 
      temperature={plant.temperature}
      onEdit={() => {
        history.push('/detail')
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
        <div className="pageHome_flotingActionButton" onClick={()=>null}>
            <Icon iconName="add"/>
        </div>
      </AppNavigation>
  );
}

