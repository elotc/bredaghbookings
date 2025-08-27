import { getOrgs, getUserCountsPerOrg } from "@/data/dataAccessLayer";
import ClubGroupingTeamSelector from "@/components/admin/org/OrgSelector";

export default async function ClubsPage() {
  const orgs = await getOrgs();
  const userCounts = await getUserCountsPerOrg();
  console.log("User counts per org:", userCounts);

  return (
    <main>
      <ClubGroupingTeamSelector 
        orgs={orgs} 
        userCounts={userCounts} />
    </main>
  );
}

