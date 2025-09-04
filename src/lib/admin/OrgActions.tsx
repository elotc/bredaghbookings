'use server';

import { createOrg, updateOrg, deleteOrg, getOrgById, getOrgGroupingsByClubId, getOrgTeamsByGroupingId } from '@/data/dataAccessLayer';
import { OrgType, StdStatus } from '@/data/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function orgAction(prevState: any, formData: FormData) {
  const id = Number(formData.get('orgId'));
  const name = formData.get('name') as string;
  const abbrev = formData.get('abbrev') as string;
  const status = formData.get('status') as string;
  const type = formData.get('type') as string;
  const clubId = formData.get('clubId') as string;
  const groupingId = formData.get('groupingId') as string;

  try {
    if (!name || !abbrev || !status || !type) {
      throw new Error("Missing required fields");
    }

    let clubIdNum = null;
    let groupingIdNum = null;

    if (type === OrgType.GROUPING) {
      if (!clubId) {
        throw new Error("There is an issue with how this grouping was created. Please contact your club admin.");
      }
      clubIdNum = Number(clubId);
      groupingIdNum = null;
    } else if (type === OrgType.TEAM) {
      if (!clubId || !groupingId) {
        throw new Error("There is an issue with how this team was created. Please contact your club admin.");
      }
      clubIdNum = Number(clubId);
      groupingIdNum = Number(groupingId);
    }

    if (id >= 0) {
      await updateOrg(id, { name, abbrev, status: status as StdStatus, type: type as OrgType, clubId: clubIdNum, groupingId: groupingIdNum });
    } else {
      await createOrg({ name, abbrev, status: status as StdStatus, type: type as OrgType, clubId: clubIdNum, groupingId: groupingIdNum });
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/orgs');
  redirect('/admin/orgs');
}

export async function deleteOrgAction(id: number) {
  try {
    const org = await getOrgById(id)
      .then(org => {
        if (!org) throw new Error('Org not found');
        return org;
      });
    if (org.type === OrgType.CLUB) {
      const groupings = await getOrgGroupingsByClubId(id);
      for (const grouping of groupings) {
        const teams = await getOrgTeamsByGroupingId(grouping.id);
        for (const team of teams) {
          await deleteOrg(team.id);
        }
        await deleteOrg(grouping.id);
      }
    } else if (org.type === OrgType.GROUPING) {
      const teams = await getOrgTeamsByGroupingId(id);
      for (const team of teams) {
        await deleteOrg(team.id);
      }
    }
    await deleteOrg(id);
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath('/admin/orgs');
}

export async function duplicateOrgAction(id: number, primaryId?: number) {
  try {

    const org = await getOrgById(id)
      .then(org => {
        if (!org) throw new Error('Org not found');
        return org;
      });

    const { id: _, ...orgData } = org;
    orgData.name = '!! ' + orgData.name;
    orgData.abbrev = '!! ' + orgData.abbrev;
    const newIds = await createOrg({ ...orgData });

    if (org.type === OrgType.CLUB) {
      for (const grouping of await getOrgGroupingsByClubId(id)) {
        const { id: _, ...groupingData } = grouping;
        const newGroupingIds = await createOrg({ ...groupingData, clubId: newIds[0].id });
        for (const team of await getOrgTeamsByGroupingId(grouping.id)) {
          const { id: _, ...teamData } = team;
          await createOrg({ ...teamData, clubId: newIds[0].id, groupingId: newGroupingIds[0].id });
        }
      }
    } else if (org.type === OrgType.GROUPING) {
      for (const team of await getOrgTeamsByGroupingId(id)) {
        const { id: _, ...teamData } = team;
        await createOrg({ ...teamData, groupingId: newIds[0].id });
      }
    }
  } catch (err: any) {
    return { error: err.message || "Unknown error" };
  }
  revalidatePath(`/admin/orgs`);
}

