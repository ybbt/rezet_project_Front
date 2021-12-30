export default function SignInUp({ children, title }) {
    return (
        <div className=" flex justify-center w-96 border-[#949494] border-2">
            <div className="w-52 flex items-center flex-col">
                <h1 className="text-xl font-bold text-[#54C1FF] mt-4">
                    {title}
                </h1>
                {children}
            </div>
        </div>
    );
}
