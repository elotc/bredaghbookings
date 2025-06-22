import { RxExclamationTriangle } from "react-icons/rx";

export default async function AuthErrorPage() {
    return (
        <main>
            <div className="grid grid-cols-3 mt-40">
                <div className="col-start-2 rounded-sm bg-white-100 p-2 shadow-sm text-center">
                    <div className="flex flex-col items-center">
                        <RxExclamationTriangle className="text-red-500 text-6xl" />
                        <div className="">
                            <h2 className="mb-4 text-xl font-bold md:text-2xl">
                                Oops! Something went wrong.
                            </h2>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-500">
                                Try signing in again. Go back to the Sign In page by
                                <br />
                                <a href="/api/auth/signin" className="text-blue-500 hover:underline">
                                    clicking here
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}