import React, { useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import AppNavigation from '../components/AppNavigation';
import {useHistory} from 'react-router-dom';
import { buildGetRequest } from '../commons/fetches';
import WelcomeInsert from '../components/WelcomInsert';
import { getUserDataFromStorage } from '../commons/utils';


export default function Home() {
  const history = useHistory();

  const [plants, setPlants] = React.useState(null);
  const [userData, setUserData] = React.useState();

  useEffect(() => {
    setUserData(getUserDataFromStorage())
    fetchPlants()
  },[])


  const fetchPlants = async () => {
    const userId = JSON.parse(window.localStorage.getItem("userData")).id
    // const request = buildGetRequest(`/plants/${userId}`)
    const request = buildGetRequest(`/plants/fromUser/1`)
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
          return mockPlantCard(index)
        })}
      </div>) 
  }
  const mockPlantCard = (plant, index) => {
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

  if (!userData?.id){
    history.push('/')
  }

  return (
      <AppNavigation>
        <div className="pageHome_cardContainer">
          {getContent()}
        </div>
      </AppNavigation>
  );
}

