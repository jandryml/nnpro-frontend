import React, {useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Title from "../dashboard/Title";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function ChauffeursTable({data, vehicles}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const getVehicleName = (value) => {
        if (value && vehicles && vehicles.length !== 0) {
            return vehicles.filter((cmp) => cmp.id === value)[0].name
        } else {
            return ""
        }
    }

    return (
        <React.Fragment>
            <Title>Chauffeur table</Title>
            <Button component={Link} to="/chauffeur/new">
                Add new chauffeur
            </Button>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Driving license</TableCell>
                        <TableCell>Driving experience</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>Vehicle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                    data.length !== 0 &&
                    data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow style={{height: 60}} key={row.id} component={Link}
                                      to={`/chauffeur/detail/${row.id}`}>
                                <TableCell>{row.firstname}</TableCell>
                                <TableCell>{row.lastname}</TableCell>
                                <TableCell>{row.drivingLicense}</TableCell>
                                <TableCell>{row.drivingExperience}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                                <TableCell>{getVehicleName(row.vehicleId)}</TableCell>
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
                onChangeRowsPerPage={handleChangeRowsPerPage}/>
        </React.Fragment>
    );
}
