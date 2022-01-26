import Cookies from "js-cookie";

export default function useCookies() {
    return Cookies.get("token_mytweeter");
}
