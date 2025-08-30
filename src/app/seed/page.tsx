"use client";

import { loadBaseData, loadTestData } from "@/data/basedata";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SeedPage() {
    console.log("SeedPage rendered");
    const [message, setMessage] = useState<string | null>(null);

    function loadBaseDataHandler() {
        loadBaseData().then((resultMessage: string) => {
            setMessage(resultMessage || "Base data loaded successfully.");
        }).catch((error) => {
            setMessage("Error loading base data: " + error.message);
        });
    }
    function loadTestDataHandler() {
        loadTestData().then((resultMessage: string) => {
            setMessage(resultMessage || "Test data loaded successfully.");
        }).catch((error) => {
            setMessage("Error loading test data: " + error.message);
        });
    }

    return (
        <main>
            <div className="p-4 m-20">
                <h1>Seed Data</h1>
                <button type="button" className="m-5 p-4 bg-blue-500" onClick={loadBaseDataHandler}>Load Base Data</button>
               
                <button type="button" className="m-5 p-4 bg-green-500" onClick={loadTestDataHandler}>Load Test Data</button>

                 <p className="mt-4 border border-gray-300 p-2">{message}</p>

                 <button type="button" className="m-5 p-4 bg-red-500" onClick={() => redirect('/home')}>Go to Home</button>
            </div>
        </main>
    );
}
