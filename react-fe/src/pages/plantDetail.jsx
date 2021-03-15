import { Card } from '@material-ui/core';
import React from 'react'
import AppNavigation from '../components/AppNavigation'
import BasicFrame from '../components/BasicFrame';
import BasicButton from '../components/BasicButton';
import HumidityChanger from '../components/HumidityChanger';
import Icon from '../components/Icon';
import AlertHint from '../components/AlertHint';
import PlantDetailImage from '../components/PlantDetailImage';
import PlantDetailInputs from '../components/PlantDetailInputs';
import {buildGetRequest, fetchImage} from '../commons/fetches'
import { buildPutRequest, putImage } from '../commons/fetches';
import { useHistory } from 'react-router-dom';
import { getUserDataFromStorage } from '../commons/utils';

export default function PlantDetail(props) {
    const history = useHistory()


    const plantId = props.match.params.plantId; 

    const [currentHumidity, setCurrentHumidity] = React.useState(0);

    const [image, setImage] = React.useState();
    const [imageBase64, setImageBase64] = React.useState();

    const [plantName, setPlantName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [targetHumidity, setTargetHumidity] = React.useState(0);

    const [isPlantNameError, setisPlantNameError] = React.useState(false);
    const [isLocationError, setisLocationError] = React.useState(false);

    const [plantNameHelperText, setPlantNameHelperText] = React.useState('')
    const [locationHelperText, setLocationHelperText] = React.useState('')

    const [alertMessage, setAlertMessage] = React.useState(false)


    const onFileInputChange = (e) => {
        let file = e.target.files[0]        
        setImage(file);
        saveFileToImageBase64(file);
    } 

    function saveFileToImageBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImageBase64(reader.result);
        };
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
    
    const fetchPlant = async (id) => {
        const request = buildGetRequest(`/plants/${id}`)
        const response = await request()
        if (response.status === 200){
            const body = await response.json()
            setPlantName(body.name)
            setLocation(body.location)
            setTargetHumidity(body.targetHumidity?body.targetHumidity:0)
            setCurrentHumidity(body.currentHumidity?body.currentHumidity:"--- ")
        }

    }

    const validateForm = () => {
        return plantName && location && targetHumidity
    }

    const onUpdate = async () => {
        setAlertMessage(null)
        try {
            if (validateForm()){
                const userData = getUserDataFromStorage()
                const request = buildPutRequest("/plants", {id: plantId, name: plantName, location, targetHumidity, ownerId: userData.id})
                const response = await request()


                if (response.status === 201){
                    const plantData = await response.json()
                    putImage(plantData.id, image).catch(() => alert("Leider konnte das Bild konnte nicht hochgeladen werden.")) 
                    history.push('/home')
                } else {
                    setAlertMessage("Da ist etwas schief gelaufen, bitte versuchen Sie es später erneut!")
                }
            } else {
                setAlertMessage("Bitte prüfen Sie Ihre Eingaben")
            }
        } catch {
            setAlertMessage("Da ist etwas schief gelaufen, bitte versuchen Sie es später erneut oder kontaktieren Sie unseren Support!")
            history.push('/home')
        }
        
    }



    React.useEffect(() => {
        const fetchData = async () => {
            fetchPlant(plantId)
            setImage(await fetchImage(plantId))
        }
        
        fetchData()
    // eslint-disable-next-line
    }, [])


    return(
        <AppNavigation>
            <div className='plantDetail_container'>
            <Card className='plantDetail_card'>
                <div className='universal_flexRow'>
                <PlantDetailImage image={image} onInputChange={onFileInputChange} />
                
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
                <div className="universal_flexRow addPlant_buttonContainer">
                    <BasicButton className="button_quit addPlant_buttonContainer_quit" onClick={() => history.push('/home')}>
                        Abbrechen
                    </BasicButton>
                    <BasicButton className="button_Accent addPlant_buttonContainer_submit" onClick={() => onUpdate()} >
                        Aktualisieren
                    </BasicButton>
                </div>
            </Card>
            </div>
            <div>
                {alertMessage ? 
                    <AlertHint 
			            message={alertMessage}
			            level='error'
			            close={() => setAlertMessage(null)}
			        /> 
		        : 
                    null}
            </div>
        </AppNavigation>
    )
}