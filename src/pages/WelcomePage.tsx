import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/main";
import {useEffect, useState } from "react";

export const WelcomePage = () => {
    const token = Cookies.get('jwt-token');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        if(token) {
            const decoded: JwtPayload = jwtDecode(token);
           setEmail(decoded.sub);
            setRole(decoded.roles[0].authority as string);
        }
    }, [token]);
    return(
        <div>
            <h1>Welcome {email}</h1>
            <h2>Your role is {role}</h2>
        </div>
    )
}