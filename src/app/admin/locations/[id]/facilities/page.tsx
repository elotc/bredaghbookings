import { getFacilitiesByLocationId, getLocationById } from "@/data/dataAccessLayer";
import FacilityTable from "@/components/admin/facility/FacilityTable";

export default async function FacilitiesPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const location = await getLocationById(id);
  const facilities = await getFacilitiesByLocationId(id);
  
  return (
    <main>
      <FacilityTable 
        location={location} 
        facilities={facilities} 
      />
    </main>
  );
}