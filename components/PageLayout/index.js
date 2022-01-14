import { SignBanner } from "../../components/SignBanner";
import { MainMenu } from "../../components/MainMenu";
// import { UserBanner } from "../../components/UserBanner";
import { DropdownUserMenu } from "../../components/DropdownUserMenu";

import { useSelector, useDispatch } from "react-redux";
// import { authMeRedux } from "../../redux/actions/authorizationActions.js";

import useAuthStatus from "../../hooks/useAuthStatus";
import useErrorStore from "../../hooks/useErrorStore";

export function PageLayout({ children, headerContent }) {
    const {
        signedUser: signedUserStore,
        isAuth: isAuthStore,
        isLoad: isLoadStore,
    } = useSelector((state) => state.authReducer);

    const errorStore = useSelector((state) => state.errorReducer.error);

    useAuthStatus();

    useErrorStore();

    if (errorStore) {
        return <div>ERROR</div>;
    }

    const signBanner = !isAuthStore && isLoadStore && <SignBanner />;

    const userBannerDropdown = isAuthStore && (
        <div className="w-32 fixed bottom-0 -translate-x-[calc(100%_+_2rem)] -translate-y-4 border border-gray">
            <DropdownUserMenu />
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
                <div className="max-w-[800px] min-w-[600px] w-3/5 h-full flex flex-col ">
                    <div className="w-32 h-40 fixed  border border-gray text-xl font-medium flex flex-col top-0 -translate-x-[calc(100%_+_2rem)] translate-y-11">
                        <MainMenu />
                    </div>
                    {userBannerDropdown}
                    {/* <header className="border border-[#949494] h-12 font-bold text-lg flex items-start justify-center pl-4 flex-col">
                        {headerContent}
                    </header> */}
                    {children}
                </div>
            </div>
            {signBanner}
        </div>
    );
}
