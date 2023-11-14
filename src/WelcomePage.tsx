import Cookies from "js-cookie";

export const WelcomePage = () => {
    const email = Cookies.get('email');
    return(
      <div>
        <h1>Welcome</h1>
        <p>{email}</p>
      </div>
    )
}