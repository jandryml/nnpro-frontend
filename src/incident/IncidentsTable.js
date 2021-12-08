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
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {SCOPES} from "../permission-provider/permission-maps";
import PermissionsGate from "../permission-provider/PermissionGate";

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

export default function IncidentsTable({data}) {
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

    return (
        <React.Fragment>
            <Title>Incident table</Title>
            <PermissionsGate scopes={[SCOPES.moderator]}>
                <Button component={Link} to="/incidents/new">
                    Add new incident
                </Button>
            </PermissionsGate>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                    data.length !== 0 &&
                    data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow style={{height: 60}} key={row.id} component={Link}
                                      to={`/incidents/detail/${row.id}`}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.severity}</TableCell>
                                <TableCell>{row.affectedRail.name}</TableCell>
                                <TableCell>{transformDateTime(row.startDate)}</TableCell>
                                <TableCell>{row.endDate ? transformDateTime(row.endDate) : ''}</TableCell>
                                <TableCell>{row.reportedBy.username}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}
