import { RxCheckCircled, RxExclamationTriangle } from "react-icons/rx";

export default function SitePageMessage({ 
    headline, 
    message, 
    label, 
    link, 
    isError = false }: 
    { headline: string, message: string, label: string, link: string, isError?: boolean }) {
    return (
        <div className="grid grid-cols-3 mt-40">
            <div className="col-start-2 rounded-sm bg-white-100 p-2 shadow-sm text-center">
                <div className="flex flex-col items-center">
                    {!isError && <RxCheckCircled className="text-red-500 text-6xl" />}
                    {isError && <RxExclamationTriangle className="text-yellow-500 text-6xl" />}
                    <div className="">
                        <h2 className="mb-4 text-xl font-bold md:text-2xl">
                            {headline}
                        </h2>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-500">
                            {message}
                            <br />
                            <a href={link} className="text-blue-500 hover:underline">
                                {label}
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
