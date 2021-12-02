import React, {useEffect} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Title from "../dashboard/Title";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {getAllTransportCompanies} from "../data-service/TransportCompanyDataService";
import {getAllVehicles} from "../data-service/VehicleDataService";

export default function VehiclesTable({data, transportCompany}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const getTransportCompanyName = (value) => {
        if (value && transportCompany && transportCompany.length !== 0) {
            return transportCompany.filter((cmp) => cmp.id === value)[0].name
        } else {
            return ""
        }
    }

    return (
        <React.Fragment>
            <Title>Vehicle table</Title>
            <Button component={Link} to="/vehicle/new">
                Add new vehicle
            </Button>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Capacity</TableCell>
                        <TableCell>Parameters</TableCell>
                        <TableCell>Transport company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                    data.length !== 0 &&
                    data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow style={{height: 60}} key={row.id} component={Link}
                                      to={`/vehicle/detail/${row.id}`}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.capacity}</TableCell>
                                <TableCell>{row.parameters}</TableCell>
                                <TableCell>{getTransportCompanyName(row.companyId)}</TableCell>
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
