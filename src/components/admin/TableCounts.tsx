
import { getAllUsers, getTableRowCounts } from "@/data/dataAccessLayer";

export default async function TableCounts() {
    const rowCounts = await getTableRowCounts();

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Database Table Row Counts</h2>
                <table className="rounded shadow">
                    <thead>
                        <tr>
                            <th className="py-1 px-4 border-b text-left">Table Name</th>
                            <th className="py-1 px-4 border-b text-left">Row Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(rowCounts.rows || rowCounts).map(
                            (row: { table_name: string; row_count: number }, idx: number) => (
                                <tr key={row.table_name || idx}>
                                    <td className="py-1 px-4 border-b">{row.table_name}</td>
                                    <td className="py-1 px-4 border-b">{row.row_count ?? 0}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}