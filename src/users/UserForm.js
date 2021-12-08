import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";

import {editUser, getUserById} from "../data-service/UserDataService";
import {ToastInfo} from "../components/ToastError";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";


makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    },
}));

function UserForm({isNew, match, history}) {
    const [users, setUsers] = useState({
        id: -1,
        username: "",
        email: "",
        password: "",
        role: 1900,
        userGroup: "",
        active: false
    });

    useEffect(() => {
        !isNew && getUserById(match.params.id).then((data) => {
            setUsers(data);
        });
    }, [match.params.id]);

    const handleSubmit = () => {
        editUser(users).then((res) => {
            if (res) {
                history.push("/users");
                ToastInfo("User successfully edited");
            }
        });
    };

 /*   const handleDelete = () => {
        deleteUser(users.id).then((res) => {
            if (res) {
                history.push("/vehicle");
                ToastInfo("Vehicle successfully removed");
            }
        });
    };
*/
    const handleChange = event => {
        const {value, name} = event.target;
        setUsers({...users, [name]: value})
    }

    return (
        <div className="container">
            <h1>User detail</h1>
            <div>
                <TextField
                    required
                    id="username"
                    margin="normal"
                    label="Username"
                    name="username"
                    fullWidth={true}
                    value={users && users.username ? users.username : ''}
                    type="textField"
                    onChange={handleChange}
                    disabled={true}
                />
                <TextField
                    required
                    id="email"
                    margin="normal"
                    label="Email"
                    name="email"
                    fullWidth={true}
                    value={users && users.email ? users.email : ''}
                    type="textField"
                    onChange={handleChange}
                    disabled={true}
                />
                <TextField
                    required
                    id="password"
                    margin="normal"
                    label="Password"
                    name="password"
                    fullWidth={true}
                    value={users && users.password ? users.password : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="role"
                    margin="normal"
                    label="Role"
                    name="role"
                    fullWidth={true}
                    value={users && users.role ? users.role : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="userGroup"
                    margin="normal"
                    label="UserGroup"
                    name="userGroup"
                    fullWidth={true}
                    value={users && users.userGroup ? users.userGroup : ''}
                    type="textField"
                    onChange={handleChange}
                />
                <div className="container-flex">
                    <FormControl fullWidth>
                        <InputLabel id="enableLabel">Active</InputLabel>
                        <Select
                            labelId="active"
                            id="active"
                            value={users ? users.active : false}
                            label="Active"
                            name="active"
                            onChange={handleChange}
                        >
                            <MenuItem key={1} value={true}>True</MenuItem>
                            <MenuItem key={2} value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="container-flex">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth={true}
                    onClick={() => history.push("/users")}
                >Back</Button>
                {/*{!isNew && <Button*/}
                {/*    type="submit"*/}
                {/*    variant="contained"*/}
                {/*    color="default"*/}
                {/*    fullWidth={true}*/}
                {/*    onClick={handleDelete}*/}
                {/*>*/}
                {/*    Delete*/}
                {/*</Button>}*/}
            </div>
        </div>
    );
}

export default withRouter(UserForm);
