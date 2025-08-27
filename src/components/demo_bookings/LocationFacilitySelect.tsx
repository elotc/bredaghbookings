import { useState } from "react";
import { Location, Facility } from "@/data/definitions";

export default function MultiLevelSelect({ locations, facilities }:{ locations: Location[], facilities: Facility[] }) {
    const [selectedLocation, setSelectedLocation] = useState<string>("select");
    const [selectedFacility, setSelectedFacility] = useState<string>("select");

    // Filter facilities based on selected location
    const filteredFacilities = facilities.filter(
        (f) => f.id === selectedLocation
    );

    return (
        <div className="flex gap-4">
            {/* Location Select */}
            <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                    value={selectedLocation}
                    onChange={e => {
                        setSelectedLocation(e.target.value);
                        setSelectedFacility("select");
                    }}
                    className="border rounded px-3 py-2"
                >
                    <option value="select">Select Location</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                </select>
            </div>
            {/* Facility Select */}
            <div>
                <label className="block text-sm font-medium mb-1">Facility</label>
                <select
                    value={selectedFacility}
                    onChange={e => setSelectedFacility(e.target.value)}
                    className="border rounded px-3 py-2"
                    disabled={selectedLocation === "select"}
                >
                    <option value="select">Select Facility</option>
                    {filteredFacilities.map(fac => (
                        <option key={fac.id} value={fac.id}>{fac.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}