import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const WelcomePage = () => {
    const email = Cookies.get('email');
    const token = Cookies.get('jwt-token') as string;
    const decoded = jwtDecode(token);

    console.log(decoded)

    return(
      <div>
        <h1>Welcome</h1>
        <p>{email}</p>
      </div>
    )
}