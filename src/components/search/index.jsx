import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputTextField from '../inputTextField';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '60em',
    },
  }
}));

function Search(props) {
  const classes = useStyles();
  const { callbacks } = props;

  return (
    <InputTextField variant="outlined" id="search" className={classes.root} label="Busque livro pelo título, autor, ou ISBN" onChange={callbacks} /> 
  );
}

export default Search;