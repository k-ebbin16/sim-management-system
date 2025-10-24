// components/Table/TableRow.jsx
const TableRow = ({ item, columns }) => {
  return (
    <tr className="hover:bg-secondary/50 transition-colors">
      {columns.map((column) => (
        <td
          key={column.key}
          className="px-4 py-3 text-sm whitespace-nowrap lg:px-6"
          style={{ minWidth: column.minWidth || "120px" }}
        >
          {column.render ? (
            column.render(item)
          ) : (
            <div
              className={`text-card-foreground ${column.truncate ? "max-w-[120px] truncate sm:max-w-[200px]" : ""}`}
            >
              {item[column.key] || column.fallback || "N/A"}
            </div>
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
