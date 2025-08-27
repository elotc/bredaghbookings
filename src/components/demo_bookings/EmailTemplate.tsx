import * as React from 'react';
import {Row, Column, Button} from "@react-email/components";

interface EmailTemplateProps {
    firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
    return (
        <body className='bg-f9f9f9'>
            

            <Row>
                <Column align="center">
                    <Row>
                        <td align="center" className="w-1/2 pr-[16px]" colSpan={1}>
                            <Button
                                className="box-border w-full rounded-[8px] bg-indigo-600 px-[20px] py-[12px] text-center font-semibold text-white"
                                href="https://react.email"
                            >
                                Login
                            </Button>
                        </td>
                        <td align="center" className="w-1/2 pl-[16px]" colSpan={1}>
                            <Button
                                className="box-border w-full rounded-[8px] border border-gray-200 border-solid bg-white px-[20px] py-[12px] text-center font-semibold text-gray-900"
                                href="https://react.email"
                            >
                                Sign up
                            </Button>
                        </td>
                    </Row>
                </Column>
            </Row>
            <div className="w-full max-w-[600px] mx-auto bg-white rounded-[10px] p-8">
                <div className="text-center py-2 text-[22px] font-sans text-[#444]">
                    Welcome {firstName} to <strong>Bredagh Bookings</strong>
                </div>
                <div className="flex justify-center py-5">
                    <a
                        href="http://bredagh.ddns.net:5555/bookings"
                        target="_blank"
                        className="text-[18px] font-sans text-white no-underline rounded-[5px] px-5 py-2 border border-[#346df1] bg-[#346df1] inline-block font-bold"
                        rel="noopener noreferrer"
                    >
                        Sign in
                    </a>
                </div>
                <div className="text-center pb-2 text-[16px] leading-[22px] font-sans text-[#444]">
                    If you did not request this email you can safely ignore it.
                </div>
            </div>
        </body>
    );
}