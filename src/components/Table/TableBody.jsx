// components/Table/TableBody.jsx
import TableRow from "./TableRow";
import TableEmpty from "./TableEmpty";
import { cn } from "../../utils/util";

const TableBody = ({ columns, data, searchTerm }) => {
  if (data.length === 0) {
    return (
      <TableEmpty
        hasData={false}
        searchTerm={searchTerm}
        colSpan={columns.length}
        columns={columns}
      />
    );
  }

  return (
    <div className="border-border rounded-lg border">
      {/* Mobile horizontal scroll indicator */}
      <div
        className={cn(
          "border-border block border-b px-4 py-2 sm:hidden",
          "bg-muted/50 text-muted-foreground text-center text-xs",
        )}
      >
        ← Scroll horizontally to view all columns →
      </div>

      {/* Table container with fixed width and horizontal scroll */}
      <div className="table-scroll max-w-full overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-secondary border-border border-b">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "text-secondary-foreground px-4 py-3 text-left text-xs font-medium tracking-wider whitespace-nowrap uppercase lg:px-6",
                  )}
                  style={{ minWidth: column.minWidth || "120px" }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-card divide-border divide-y">
            {data.map((item, index) => (
              <TableRow key={item.id || index} item={item} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
