import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Title from "../dashboard/Title";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const transformDateTime = (datetime) => {
    let str = datetime.substring(11, 16).split(':');
    let stra = datetime.substring(0, 10);

    let year = stra.replaceAll('-', ' ').split(' ')[0]
    let month = stra.replaceAll('-', ' ').split(' ')[1]
    let day = stra.replaceAll('-', ' ').split(' ')[2]

    let hours = str[0]
    let minutes = str[1]

    return day + ". " + month + ". " + year + " " + hours + ":" + minutes
}

export default function IncidentsTable({
                                           data,
                                           deleteItemById,
                                           selectItemId,
                                       }) {
    useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const CustomColorIconButtonDelete = withStyles({
        root: {
            color: "red"
        }
    })(IconButton);

    const CustomColorIconButtonEdit = withStyles({
        root: {
            color: "orange"
        }
    })(IconButton);

    const deleteItem = (id) => {
        console.log(id);
        deleteItemById(id);
    };

    const selectItem = (id) => {
        selectItemId(id);
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <React.Fragment>
            <Title>Stations table</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Affected rail</TableCell>
                        <TableCell>Start date</TableCell>
                        <TableCell>End date</TableCell>
                        <TableCell>Reported by</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                    data.size !== 0 &&
                    data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.severity}</TableCell>
                                <TableCell>{row.affectedRail.name}</TableCell>
                                <TableCell>{transformDateTime(row.startDate)}</TableCell>
                                <TableCell>{transformDateTime(row.endDate)}</TableCell>
                                <TableCell>{row.reportedBy.username}</TableCell>
                                <TableCell>
                                    <CustomColorIconButtonEdit variant="contained"
                                                               onClick={selectItem.bind(this, row.id)} color="primary">
                                        <EditIcon/>
                                    </CustomColorIconButtonEdit>
                                </TableCell>
                                <TableCell>
                                    <CustomColorIconButtonDelete variant="contained"
                                                                 onClick={deleteItem.bind(this, row.id)}
                                                                 color="primary">
                                        <DeleteForeverIcon/>
                                    </CustomColorIconButtonDelete>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}
