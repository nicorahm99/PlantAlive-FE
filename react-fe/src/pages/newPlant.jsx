import React from 'react'
import { buildPostRequest } from '../commons/fetches';
import AppNavigation from '../components/AppNavigation'
import BasicButton from '../components/BasicButton';
import AlertHint from '../components/AlertHint';
import HumidityChanger from '../components/HumidityChanger';
import PlantDetailImage from '../components/PlantDetailImage';
import PlantDetailInputs from '../components/PlantDetailInputs';
import { useHistory } from 'react-router-dom';
import { getUserDataFromStorage } from '../commons/utils';

export default function NewPlant(props) {
    const history = useHistory()

    const [image, setImage] = React.useState();
    const [imagePath, setImagePath] = React.useState();

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

        let path = URL.createObjectURL(file)
        
        setImage(file);
        setImagePath(path)
    } 

    const fetchImage = async (url) => {
        let response = await fetch(url)
        let image = await response.blob()
        let imagePath = URL.createObjectURL(image)

        console.log(imagePath)

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

    const validateForm = () => {
        return plantName && location && targetHumidity
    }

    const onSubmit = async () => {
        setAlertMessage(null)
        if (validateForm()){
            const userData = getUserDataFromStorage()
            const request = buildPostRequest("/plants", {name: plantName, location, targetHumidity, ownerId: userData.id})
            const response = await request()
            if (response.status === 201){
                history.push('/home')
            } else {
                setAlertMessage("Da ist etwas schief gelaufen, bitte versuchen Sie es später erneut!")
            }
        } else {
            setAlertMessage("Bitte prüfen Sie Ihre Eingaben")
        }
        
    }

    React.useEffect(() => {
        fetchImage('https://picsum.photos/200')
    }, [])


    return(
        <AppNavigation>
            <div className='universal_centeredContent addPlant_container'>
            <div className='addPlant_card'>
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

                <HumidityChanger
                    value={targetHumidity}
                    setValue={setTargetHumidity}
                />
                <div className="universal_flexRow addPlant_buttonContainer">
                    <BasicButton className="button_quit addPlant_buttonContainer_quit">
                        Abbrechen
                    </BasicButton>
                    <BasicButton className="button_Accent addPlant_buttonContainer_submit" onClick={() => onSubmit()} >
                        Hinzufügen
                    </BasicButton>
                </div>
            </div>
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