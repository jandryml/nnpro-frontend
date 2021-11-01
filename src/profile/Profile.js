import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getUser} from "../data-service/UserDataService";

function Profile() {
    const [id, setId] = useState();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [emailAddress, setEmailAddress] = useState("");


    const getActualUser = () => {
        getUser().then((data) => {
            setId(data.id)
            setUsername(data.username);
            setRole(data.role);
            setEmailAddress(data.email);
        });
    }

    useEffect(() => {
        getActualUser();
    }, []);

    const saveProfileChanges = () => {
        /*editUser({
            id, username, firstName, lastName, emailAddress
        })*/
    }

    return (
        <div>
            <div className="container-flex">
                <h1>User profile : </h1>
            </div>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                value={username}
                disabled={true}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={emailAddress}
                disabled={true}
                onChange={(e) => setEmailAddress(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Role"
                name="role"
                value={role}
                disabled={true}
                onChange={(e) => setRole(e.target.value)}
            />
            <Button
                id="saveProfileDataButton"
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                onClick={saveProfileChanges}
            >
                Save
            </Button>
        </div>
    );
}

export default Profile;
