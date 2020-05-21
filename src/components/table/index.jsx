import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Button from '../button';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'rgba(224, 224, 224, 0.644)',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
        alignTable: {
        marginTop: '20px'
    }
});

export default function TableComponent(props) {
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const data = props.data;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const expandRow = id => {
        const itemClicado = data.filter(el => 
            el.id === id
        )

        setOpen(!open)
        itemClicado[0].open = open;
    }

    return (
        <>
            <TableContainer component={Paper} className={classes.alignTable}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Livro</StyledTableCell>
                            <StyledTableCell align="right">Autor</StyledTableCell>
                            <StyledTableCell align="right">Editora</StyledTableCell>
                            <StyledTableCell align="right">Ano</StyledTableCell>
                            <StyledTableCell align="right">Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map(row => {
                        return (
                            <Fragment key={row.id}>
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.volumeInfo.title} <br />
                                        {row.volumeInfo.industryIdentifiers && row.volumeInfo.industryIdentifiers.map(item => item.type === 'ISBN_13' ? " (" + item.identifier + ")" : null )} 
                                    </TableCell>
                                    <TableCell align="right">{row.volumeInfo.authors.map(autor => 
                                        autor + ", "
                                    )}</TableCell>
                                    <TableCell align="right">{row.volumeInfo.publisher}</TableCell>
                                    <TableCell align="right">{row.volumeInfo.publishedDate.split('-')[0]}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" ariaLabel="expand row" size="small" onClick={() => expandRow(row.id)} text='Detalhes' />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={row.open ? true : false} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Detalhes
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Título: {row.volumeInfo.title}</TableCell>
                                                            <TableCell>ISBN: {row.volumeInfo.industryIdentifiers && row.volumeInfo.industryIdentifiers.map(item => item.type === 'ISBN_13' ? " (" + item.identifier + ")" : null )}</TableCell>
                                                            <TableCell align="right">Autor(es): {row.volumeInfo.authors.map(autor => autor + ", ")}</TableCell>
                                                            <TableCell align="right">Editora: {row.volumeInfo.publisher}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Ano: {row.volumeInfo.publishedDate.split('-')[0]}</TableCell>
                                                            <TableCell>Idioma: ({row.volumeInfo.language})</TableCell>
                                                            <TableCell align="right">Classificação média: {row.volumeInfo.averageRating}</TableCell>
                                                            <TableCell align="right">Contagem de classificações: {row.volumeInfo.averageRating}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow> 
                            </Fragment>
                        )
                    })}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow> 
                    </TableFooter> 
                </Table>
            </TableContainer>
        </>
    );
}