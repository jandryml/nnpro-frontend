import React, {useEffect, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Title from "../dashboard/Title";
import {Link} from "react-router-dom";
import {getAllTransportCompanies} from "../data-service/TransportCompanyDataService";

export default function VehicleTableFilter({data, requiredCapacity}) {

    const [page, setPage] = React.useState(0);
    const [transportCompany, setTransportCompany] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        getAllTransportCompanies().then((data) => {
            setTransportCompany(data)
        });

    }, []);


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const getSelectedCapacity = () => {
        let capacity = 0
        data.forEach((items)=>{
            capacity += items.capacity
        })
        return capacity
    }

    const getTransportCompanyName = (value) => {
        if (value && transportCompany && transportCompany.length !== 0) {
            return transportCompany.filter((cmp) => cmp.id === value)[0].name
        } else {
            return ""
        }
    }

    return (
        <React.Fragment>
            <br/><br/>
            <Title>Selected vehicles: capacity: {getSelectedCapacity()} / {requiredCapacity}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Capacity</TableCell>
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
