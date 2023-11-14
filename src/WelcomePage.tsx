import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const WelcomePage = () => {
    const email = Cookies.get('email');
    const token = Cookies.get('jwt-token') as string;
    const decoded = jwtDecode(token);
    // @ts-ignore
    const role = decoded.roles[0].authority;
    console.log(role)

    return(
      {role === 'ADMIN' ? <AdminPage /> : <UserPage />}
    )
}