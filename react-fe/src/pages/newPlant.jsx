import React, { useEffect } from 'react';
import { buildGetRequest, buildPostRequest, postImage } from '../commons/fetches';
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
    const [imageBase64, setImageBase64] = React.useState();

    const [plantName, setPlantName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [targetHumidity, setTargetHumidity] = React.useState(0);

    const [isPlantNameError, setisPlantNameError] = React.useState(false);
    const [isLocationError, setisLocationError] = React.useState(false);

    const [plantNameHelperText, setPlantNameHelperText] = React.useState('')
    const [locationHelperText, setLocationHelperText] = React.useState('')

    const [alertMessage, setAlertMessage] = React.useState(false)

    const [availablePlants, setAvailablePlants] = React.useState([])
    

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

    const validateForm = () => {
        return plantName && location && targetHumidity
    }

    const onSubmit = async () => {
        setAlertMessage(null)
        try {
            if (validateForm()){
                const userData = getUserDataFromStorage()
                const request = buildPostRequest("/plants", {name: plantName, location, targetHumidity, ownerId: userData.id})
                const response = await request()


                if (response.status === 201){
                    const plantData = await response.json();
                    if (image) postImage(plantData.id, image).catch(() => alert("Leider konnte das Bild konnte nicht hochgeladen werden.")) 
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

    const fetchAvailableTopics = async () => {
        const request = buildGetRequest("/plants/available")
        const response = await request()
        if (response.status == 200){
            const responseBody = await response.json()
            setAvailablePlants(responseBody)
            if (!responseBody[0]){
                setAlertMessage("Leider konnten keine verfügbaren Töpfe gefunden werden. Stellen Sie sicher, dass der Topf mit dem WLAN und Stromnetz verbunden ist.")
            }
        } else {
            setAlertMessage("Leider konnten die verfügbaren Töpfe nicht geladen werden.")
        }
    }

    useEffect(() => {
        fetchAvailableTopics()
    }, [])

    return(
        <AppNavigation>
            <div className='universal_centeredContent addPlant_container'>
            <div className='addPlant_card'>
                <div className='universal_flexRow'>
                <PlantDetailImage image={imageBase64} onInputChange={onFileInputChange} />
                
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
                    <BasicButton className="button_quit addPlant_buttonContainer_quit" onClick={() => history.push('/home')}>
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