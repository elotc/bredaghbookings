import { getLocationById, getLocations } from "@/data/dataAccessLayer";
import LocationForm from "@/components/admin/location/LocationForm";
import { notFound } from "next/navigation";

export default async function EditLocationPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const location = await getLocationById(Number(id));
  if (!location) notFound();
  
  const locations = await getLocations();

  return (
      <LocationForm
        locations={locations}
        location={location}
      />
  );
}