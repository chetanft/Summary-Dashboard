import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
  Checkbox,
} from '@mui/material';
import { Text } from '../typography';

/**
 * Enhanced Table component with sorting, pagination, and selection.
 */
const Table = ({
  columns,
  data,
  defaultSortColumn,
  defaultSortDirection = 'asc',
  selectable = false,
  onSelectionChange,
  pagination = true,
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
  stickyHeader = false,
  emptyMessage = 'No data available',
  onRowClick,
  className,
  sx = {},
  ...props
}) => {
  // State for sorting
  const [sortBy, setSortBy] = useState(defaultSortColumn || '');
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // State for selection
  const [selected, setSelected] = useState([]);

  // Sort and paginate data
  const sortedData = useMemo(() => {
    let sortedRows = [...data];
    
    if (sortBy) {
      const column = columns.find(col => col.id === sortBy);
      if (column && column.sortable !== false) {
        sortedRows.sort((a, b) => {
          const valueA = column.accessor ? column.accessor(a) : a[sortBy];
          const valueB = column.accessor ? column.accessor(b) : b[sortBy];
          
          // Handle different data types
          if (valueA === valueB) return 0;
          
          if (valueA === null || valueA === undefined) return 1;
          if (valueB === null || valueB === undefined) return -1;
          
          // Compare based on data type
          if (typeof valueA === 'string') {
            return sortDirection === 'asc'
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
          
          return sortDirection === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        });
      }
    }
    
    return sortedRows;
  }, [data, sortBy, sortDirection, columns]);

  // Get paginated data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, pagination, page, rowsPerPage]);

  // Handle sort request
  const handleRequestSort = (columnId) => {
    const isAsc = sortBy === columnId && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(columnId);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.id);
      setSelected(newSelected);
      if (onSelectionChange) {
        onSelectionChange(newSelected);
      }
    } else {
      setSelected([]);
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    }
  };

  // Handle row selection
  const handleRowSelect = (event, id) => {
    event.stopPropagation();
    
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  // Check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Base styles for the table
  const baseStyles = {
    width: '100%',
    ...sx,
  };

  return (
    <Paper sx={baseStyles} className={className}>
      <TableContainer>
        <MuiTable stickyHeader={stickyHeader} {...props}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  padding={column.disablePadding ? 'none' : 'normal'}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: 'var(--color-background-table-header, #F5F7FA)',
                    ...(column.width && { width: column.width }),
                    ...(column.minWidth && { minWidth: column.minWidth }),
                    ...(column.maxWidth && { maxWidth: column.maxWidth }),
                    ...(column.sx || {}),
                  }}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => {
                const isItemSelected = selectable && isSelected(row.id);
                
                return (
                  <TableRow
                    hover
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id || index}
                    selected={isItemSelected}
                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleRowSelect(event, row.id)}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = column.accessor ? column.accessor(row) : row[column.id];
                      
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                          padding={column.disablePadding ? 'none' : 'normal'}
                        >
                          {column.render ? column.render(value, row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Text>{emptyMessage}</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      
      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

Table.propTypes = {
  /** Array of column definitions */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique identifier for the column */
      id: PropTypes.string.isRequired,
      /** Display label for the column */
      label: PropTypes.node.isRequired,
      /** Function to access the cell value from the row data */
      accessor: PropTypes.func,
      /** Function to render the cell content */
      render: PropTypes.func,
      /** Text alignment for the column */
      align: PropTypes.oneOf(['left', 'center', 'right']),
      /** Whether the column is sortable */
      sortable: PropTypes.bool,
      /** Whether to disable padding for the column */
      disablePadding: PropTypes.bool,
      /** Width of the column */
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      /** Minimum width of the column */
      minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      /** Maximum width of the column */
      maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      /** Custom styles for the column */
      sx: PropTypes.object,
    })
  ).isRequired,
  /** Array of data objects */
  data: PropTypes.array.isRequired,
  /** Default column to sort by */
  defaultSortColumn: PropTypes.string,
  /** Default sort direction */
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  /** Whether rows are selectable */
  selectable: PropTypes.bool,
  /** Callback when selection changes */
  onSelectionChange: PropTypes.func,
  /** Whether to show pagination */
  pagination: PropTypes.bool,
  /** Options for rows per page */
  rowsPerPageOptions: PropTypes.array,
  /** Default rows per page */
  defaultRowsPerPage: PropTypes.number,
  /** Whether the header should stick to the top */
  stickyHeader: PropTypes.bool,
  /** Message to display when there is no data */
  emptyMessage: PropTypes.node,
  /** Callback when a row is clicked */
  onRowClick: PropTypes.func,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Table;
