import { RxCheckCircled } from "react-icons/rx";

export default async function AuthSuccessPage() {
    return (
        <main>
            <div className="grid grid-cols-3 mt-40">
                <div className="col-start-2 rounded-sm bg-white-100 p-2 shadow-sm text-center">
                    <div className="flex flex-col items-center">
                        <RxCheckCircled className="text-green-500 text-6xl" />
                        <h2 className="mb-4 text-xl font-bold md:text-2xl">
                            Success! Please check your email inbox for a sign-in link.
                        </h2>

                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-500">
                            If you don't see the email, go back to the Sign In page by
                            <br /> 
                            <a href="/api/auth/signin" className="text-blue-500 hover:underline">
                                clicking here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}