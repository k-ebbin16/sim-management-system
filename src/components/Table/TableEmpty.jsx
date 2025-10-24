// components/Table/TableEmpty.jsx
import { cn } from "../../utils/util";

const TableEmpty = ({ hasData, searchTerm, colSpan, columns }) => {
  return (
    <div className="border-border rounded-lg border">
      <div className="table-scroll max-w-full overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-secondary border-border border-b">
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
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
          <tbody>
            <tr>
              <td colSpan={colSpan} className="px-4 py-8 text-center sm:py-12">
                <div className="text-muted-foreground">
                  <svg
                    className="text-muted-foreground/60 mx-auto h-8 w-8 sm:h-12 sm:w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-card-foreground mt-2 text-base font-medium sm:mt-3 sm:text-lg">
                    {hasData ? "No items found" : "No items available"}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm">
                    {hasData
                      ? "Try adjusting your search terms"
                      : "There are no items to display"}
                  </p>
                  {searchTerm && hasData && (
                    <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                      No results for "
                      <span className="text-foreground font-medium">
                        "{searchTerm}"
                      </span>
                      "
                    </p>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEmpty;
