import { FacilityList } from "@/data/definitions";

export function SelectFacility({facilities, selectedFacility, setSelectedFacility}:
    {   facilities: FacilityList[], 
        selectedFacility: number, 
        setSelectedFacility: (facility: number) => void
    }) {
    return (
        <div>
            <h2>Select Facility</h2>
            <ul className="px-5 mb-2">
                {facilities.map(facility => (
                    <li key={facility.id}>
                        <button
                            onClick={() => setSelectedFacility(facility.id)}
                            className={`block w-full text-left p-1 ${selectedFacility === facility.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                        >
                            {facility.locationName} / {facility.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
