import { Card } from '@material-ui/core';
import React from 'react'
import AppNavigation from '../components/AppNavigation'
import BasicFrame from '../components/BasicFrame';
import HumidityChanger from '../components/HumidityChanger';
import Icon from '../components/Icon';
import PlantDetailImage from '../components/PlantDetailImage';
import PlantDetailInputs from '../components/PlantDetailInputs';

export default function PlantDetail(props) {
    const [currentHumidity, setCurrentHumidity] = React.useState(0);

    const [image, setImage] = React.useState();
    const [imagePath, setImagePath] = React.useState();

    const [plantName, setPlantName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [targetHumidity, setTargetHumidity] = React.useState(0);

    const [isPlantNameError, setisPlantNameError] = React.useState(false);
    const [isLocationError, setisLocationError] = React.useState(false);

    const [plantNameHelperText, setPlantNameHelperText] = React.useState('')
    const [locationHelperText, setLocationHelperText] = React.useState('')

    const onFileInputChange = (e) => {
        let file = e.target.files[0]

        let path = URL.createObjectURL(file)
        
        setImage(file);
        setImagePath(path)
    } 

    const fetchImage = async (url) => {
        let response = await fetch(url)
        let image = await response.blob()
        let imagePath = URL.createObjectURL(image)

        setImage(image)
        setImagePath(imagePath)
    }

    const onPlantNameChange = (event) => {
        const value = event.target.value 

        if (value === ''){
            setisPlantNameError(true)
            setPlantNameHelperText('Bitte geben Sie einen Namen ein')
        } else {
            setisPlantNameError(false)
            setPlantNameHelperText('')
        }
        setPlantName(value)
    }

    const onLocationChange = (event) => {
        const value = event.target.value 

        if (value === ''){
            setisLocationError(true)
            setLocationHelperText('Bitte geben Sie einen Standort an')
        } else {
            setisLocationError(false)
            setLocationHelperText('')
        }
        setLocation(value)
    }

    React.useEffect(() => {
        fetchImage('https://picsum.photos/200')
    }, [])


    return(
        <AppNavigation>
            <div className='plantDetail_container'>
            <Card className='plantDetail_card'>
                <div className='universal_flexRow'>
                <PlantDetailImage imagePath={imagePath} onInputChange={onFileInputChange} />
                
                <span className='plantDetail_plantName'>{plantName?plantName:'Pflanzenname'}</span>
                </div>
                <PlantDetailInputs 
                    isNameError={isPlantNameError}
                    name={plantName} 
                    onNameChange={onPlantNameChange}
                    nameHelperText={plantNameHelperText}
                    isLocationError={isLocationError}
                    location={location}
                    onLocationChange={onLocationChange}
                    locationHelperText={locationHelperText}
                />

                <BasicFrame className="plantDetail_currentHumidityLabel">
                    <span className='plantDetail_currentHumidityLabel_text'>
                        Ist-
                    </span>
                    <Icon iconName='humidity' className='plantDetail_currentHumidityLabel_icon'/>
                    <span className='plantDetail_currentHumidityLabel_value'>
                        {currentHumidity + '%'}    
                    </span>    
                </BasicFrame>
                <HumidityChanger
                    value={targetHumidity}
                    setValue={setTargetHumidity}
                /> 
            </Card>
            </div>
        </AppNavigation>
    )
}