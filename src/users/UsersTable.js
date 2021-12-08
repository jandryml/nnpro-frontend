import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Title from "../dashboard/Title";
import {Link} from "react-router-dom";
import {SCOPES} from "../permission-provider/permission-maps";
import PermissionsGate from "../permission-provider/PermissionGate";

export default function UsersTable({data}) {
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
            <PermissionsGate scopes={[SCOPES.admin]} showError img>
                <Title>Users table</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>User Group</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                        data.length !== 0 &&
                        data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow style={{height: 60}} key={row.id} component={Link}
                                          to={`/user/detail/${row.id}`}>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>{row.userGroup}</TableCell>
                                    <TableCell>{row.active ? "True" : "False"}</TableCell>
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
            </PermissionsGate>
        </React.Fragment>
    );
}
