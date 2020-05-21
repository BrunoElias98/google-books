import React, { memo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import Search from '../search';
import Table from '../table';
import DatePicker from '../datePicker';
import Button from '../button';

const useStyles = makeStyles(() => ({
    alignInput: {
        margin: '20px 0'
    },
    alignTextFilter: {
        margin: '10px 10px 10px 10px',
        display: 'flex'
    },
    alignButtonFilter: {
        margin: '22px 0 0 10px'
    }
}));

function Main() {
    const classes = useStyles();
    const [books, setBooks] = useState([]);
    const [showBooks, setShowBooks] = useState([]);
    
    useEffect(() => {
        async function loadBooks() {
            const response = await api.get('/books/v1/volumes?q=evolution');

            setBooks(response.data.items)
            setShowBooks(response.data.items)
        }

        loadBooks()
    }, []);

    const filterListName = event => {
        let updatedList = books.filter(item => 
            item.volumeInfo.title.toLowerCase().includes(event.target.value.toLowerCase()) 
        );

        setShowBooks(updatedList);
    }
    
    const filterListDate = () => {
        const dataDe = document.getElementById('dataDe').value;
        const dataAte = document.getElementById('dataAte').value;

        if (dataDe === '' || dataAte === '') {
            setShowBooks(books)
        } else {
            let filterByDate = books.filter(item => {
                return item.volumeInfo.publishedDate >= dataDe &&
                       item.volumeInfo.publishedDate <= dataAte;
            });
            
            setShowBooks(filterByDate);
        }
    }

    showBooks.map(items => 
        Object.assign(items, { open: false })    
    );
    
    return (
        <>
            <div className={classes.alignInput}>
                <Search callbacks={filterListName} />
                <div className={classes.alignTextFilter}>
                    <DatePicker label='de' id='dataDe' variant='inline' format='yyyy-MM' margin='normal' /> 
                    <DatePicker label='até' id='dataAte' variant='inline' format='yyyy-MM' margin='normal' /> 
                    <div className={classes.alignButtonFilter}>
                        <Button variant='contained' color='primary' text='Filtrar' onClick={filterListDate} />
                    </div>
                </div>
                {showBooks.length !== 0 ? 
                    <Table data={showBooks} />
                : null} 
            </div> 
        </>
    );
}

export default memo(Main);