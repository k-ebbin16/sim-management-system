// components/Table/TableEmpty.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */

library.add(fas, far, fab);

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
                  <FontAwesomeIcon
                    icon="fa-regular fa-face-meh "
                    className="text-muted-foreground/60 mb-3 text-3xl"
                  />
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
