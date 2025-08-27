import FacilityForm from "@/components/admin/facility/FacilityForm";
import { getFacilities, getLocationById, getOrgClubs, getSchedules } from "@/data/dataAccessLayer";

export default async function CreateFacilityPage({ params }: { params: { id: number } }) {
  const { id } = await params;
  const location = await getLocationById(id);
  const schedules = await getSchedules();
  const facilities = await getFacilities();
  return (
    <FacilityForm
      location={location}
      facilities={facilities}
      schedules={schedules}
    />
  );
}