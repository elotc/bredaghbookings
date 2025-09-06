"use client"

import { checkUserIsRegistered } from "@/lib/auth/checkUserExists";
import { handleEmailSignin } from "@/lib/auth/emailSigninServerActions";
import { useState, useTransition } from "react";

export function SignInPage() {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({ email: "" as string });
    const [disableButton, setDisableButton] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (await checkUserIsRegistered(formData.email)) {
            startTransition(async () => { await handleEmailSignin(formData.email); });
        } else {
            alert("You have not been registered as a user. Please contact your administrator.");
        }
    }


    return (
        <main>
            <div className="m-10">
                <div className="rounded-sm bg-white-50 p-2 shadow-sm text-center">
                    <div className="">
                        <h2 className="mb-4 text-xl font-bold md:text-2xl">
                            Sign In
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="p-4">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) => {
                                        setFormData({ email: e.target.value });
                                        setDisableButton(false);
                                    }}
                                    value={formData.email}
                                    placeholder="Email"
                                    className="w-full h-10 shadow-lg rounded-sm bg-grey-300 px-5 hover:bg-grey-400"
                                    disabled={isPending}
                                    required
                                />
                            </div>
                            <div className="p-4">
                                <button
                                    type="submit"
                                    className="w-full h-10 items-center shadow-lg  rounded-sm bg-blue-300 px-5 text-white hover:bg-blue-400"
                                    disabled={disableButton}
                                >
                                    Sign-in via Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}