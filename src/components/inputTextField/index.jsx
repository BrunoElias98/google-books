import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function InputTextField(props) {
    const { variant, id, className, label, onChange } = props

    return (
        <TextField variant={variant} id={id} className={className} label={label} onChange={onChange} />
    );
}