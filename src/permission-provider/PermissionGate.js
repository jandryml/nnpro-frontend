import {PERMISSIONS} from "./permission-maps";
import React from "react";
import logo from '../resources/shall_not.jpg';

const hasPermission = ({permissions, scopes}) => {
    const scopesMap = {};
    scopes.forEach((scope) => {
        scopesMap[scope] = true;
    });

    return permissions.some((permission) => scopesMap[permission]);
};

export default function PermissionsGate({children, scopes = [], showError = false, img = false}) {
    const role = localStorage.getItem('role');
    const permissions = PERMISSIONS[role];
    const permissionGranted = hasPermission({permissions, scopes});

    if (!permissionGranted && showError) return <>
        <div className="container">
            <h1>You shall not pass!</h1>
            {img && <img src={logo} alt="Logo"/>}
        </div>
    </>

    if (!permissionGranted) return <></>

    return <>{children}</>;
}