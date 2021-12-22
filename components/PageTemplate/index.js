export function PageTemplate({ children, signBanner = null }) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
                <div className="max-w-[800px] min-w-[600px] w-3/5 h-full flex flex-col ">
                    {children}
                </div>
            </div>
            {signBanner}
        </div>
    );
}
