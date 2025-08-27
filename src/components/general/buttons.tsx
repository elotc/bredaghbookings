"use client";

import { loadBaseData, loadTestData } from '@/data/basedata';
import { useState } from 'react';

const btnClass = "m-4 px-4 py-2 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export function LoadBaseDataBtn() {
    return (
        <form action={loadBaseData} className="inline">
            <button type="submit" className={btnClass}>
                Load Base Data
            </button>
        </form>
    );
}

export function LoadTestDataBtn() {
    return (
        <form action={loadTestData} className="inline">
            <button type="submit" className={btnClass}>
                Load Test Data
            </button>
        </form>
    );
}




