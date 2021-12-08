import React from "react";
import Button from "@material-ui/core/Button";
import {SCOPES} from "../permission-provider/permission-maps";
import PermissionsGate from "../permission-provider/PermissionGate";

class Report extends React.Component {
    downloadChauffeursReport = () => {
        fetch('http://localhost:8080/api/report/chauffeurs')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `Chauffeurs_${new Date(Date.now()).toISOString()}.xlsx`
                    a.click();
                });
            });
    }

    downloadIncidentsReport = () => {
        fetch('http://localhost:8080/api/report/incidents')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `Incidents_${new Date(Date.now()).toISOString()}.xlsx`
                    a.click();
                });
            });
    }

    render() {
        return (

            <div>
                <PermissionsGate scopes={[SCOPES.admin]} showError img>
                    <div>
                        <label>Generate driver report: </label>
                        <Button onClick={this.downloadChauffeursReport}>Generate</Button>
                    </div>
                    <div>
                        <label>Generate incident report: </label>
                        <Button onClick={this.downloadIncidentsReport}>Generate</Button>
                    </div>
                </PermissionsGate>
            </div>
        )
    };
}

export default Report;
