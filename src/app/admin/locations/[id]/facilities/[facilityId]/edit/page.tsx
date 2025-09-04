import { getFacilitiesByLocationId, getFacilityById, getLocationById, getSchedules } from "@/data/dataAccessLayer";
import FacilityForm from "@/components/admin/facility/FacilityForm";
import { notFound } from "next/navigation";

export default async function EditFacilityPage({ params }: { params: Promise<{ id: number, facilityId: number }> }) {
  const { id, facilityId } = await params;
  const facility = await getFacilityById(facilityId);
  if (!facility) notFound();

  const location = await getLocationById(id);
  const facilities = await getFacilitiesByLocationId(id);
  const schedules = await getSchedules();

  return (
    <FacilityForm
      facility={facility}
      location={location}
      schedules={schedules}
      facilities={facilities}
    />
  );
}