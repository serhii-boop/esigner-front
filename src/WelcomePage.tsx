import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect } from "react";

export const WelcomePage = () => {
    const email = Cookies.get('email');
    const token = Cookies.get('jwt-token');

    useEffect(() => {
        if(!token) {
            return;
        }
        const decodedToken = jwt.decode(token);

        console.log(decodedToken);
    }, []);
    return(
      <div>
        <h1>Welcome</h1>
        <p>{email}</p>
      </div>
    )
}