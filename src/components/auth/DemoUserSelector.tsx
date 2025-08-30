"use client";

import { BaseUser } from "@/data/definitions";
import { StdForm, StdFormButtonBar, StdFormSelect, StdFormSubmitBtn } from "@/components/general/StdForm";
import { useContext, useEffect } from "react";
import { userSelectorAction } from "@/lib/auth/UserSelectorActions";
import { UserOrgContext } from "@/components/auth/UserOrgContext";


export default function DemoUserSelector({ users }: { users: BaseUser[]; }) {

    let { userId, setUserId } = useContext(UserContext);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            if (userId === "") setUserId(storedUserId);
        }
    }, [userId, setUserId]);

    const setSelectedUserId = (userId: string) => {
        setUserId(userId);
        localStorage.setItem("userId", userId);
    };

    return (
        <StdForm title="Demo User Selector" action={userSelectorAction}>
            <StdFormSelect
                name="userId" label="Select a demo user"
                defaultValue={userId}
                onChange={setSelectedUserId}
                options={[
                    { value: "", label: "Select a user" },
                    ...users.map(u => ({ value: u.id, label: `User: ${u.email}` }))
                ]}
            />
            <StdFormButtonBar>
                <StdFormSubmitBtn disabled={
                    !userId.trim()
                } >
                    Go
                </StdFormSubmitBtn>
            </StdFormButtonBar>
        </StdForm>

    );

}

