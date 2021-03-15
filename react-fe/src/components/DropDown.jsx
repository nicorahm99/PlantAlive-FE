import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDown (props) {
  const classes = useStyles();
  const [plantAdress, setPlantAdress] = React.useState('');

  const handleChange = (event) => {
    const selectedAdress = event.target.value
    setPlantAdress(selectedAdress);
    props.onChange(selectedAdress)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Pflanzenadresse</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={plantAdress}
          onChange={handleChange}
        >
          {props.availablePlants?.map((plantAdress, index) => {return <MenuItem key={index} value={plantAdress}>{plantAdress}</MenuItem>})}
        </Select>
      </FormControl>
    </div>
  )
}