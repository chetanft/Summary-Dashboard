import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Typography,
  useTheme,
} from '@mui/material';

/**
 * StandardTable component for displaying tabular data with sorting, pagination, and row selection
 * This component standardizes table styling and behavior across the application
 * 
 * @component
 * @example
 * <StandardTable
 *   columns={[
 *     { id: 'id', label: 'ID', sortable: true },
 *     { id: 'name', label: 'Name', sortable: true },
 *     { id: 'status', label: 'Status', sortable: true, renderCell: (row) => <StatusChip status={row.status} /> }
 *   ]}
 *   data={rows}
 *   onRowClick={handleRowClick}
 *   selectable
 * />
 */
const StandardTable = ({
  columns = [],
  data = [],
  initialSortBy = '',
  initialSortDirection = 'asc',
  onRowClick,
  onSelectionChange,
  selectable = false,
  loading = false,
  pagination = true,
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  stickyHeader = false,
  emptyStateMessage = 'No data available',
  rowIdField = 'id',
  rowsPerPageLabel = 'Rows per page:',
  zebra = true,
  highlightOnHover = true,
  headerBackgroundColor,
  variant = 'default',
  size = 'medium',
  ...props
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [selected, setSelected] = useState([]);

  // Reset page when data changes
  useEffect(() => {
    setPage(0);
  }, [data]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sort
  const handleRequestSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  // Handle select all
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n[rowIdField]);
      setSelected(newSelected);
      if (onSelectionChange) {
        onSelectionChange(newSelected);
      }
      return;
    }
    setSelected([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  // Handle row selection
  const handleClick = (event, id) => {
    if (!selectable) return;
    
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  // Check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Sort the data
  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortBy, sortDirection]);

  // Paginate the data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [sortedData, pagination, page, rowsPerPage]);

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        };
      case 'filled':
        return {
          backgroundColor: theme.palette.background.default,
        };
      case 'elevated':
        return {
          boxShadow: theme.shadows[2],
        };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();

  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          '& .MuiTableCell-root': {
            padding: '6px 16px',
          },
        };
      case 'large':
        return {
          '& .MuiTableCell-root': {
            padding: '16px 24px',
          },
        };
      default:
        return {};
    }
  };

  const sizeStyles = getSizeStyles();

  // Header background color
  const headerBgColor = headerBackgroundColor || theme.palette.background.light;
  const headerTextColor = theme.palette.getContrastText(headerBgColor);

  return (
    <Box sx={{ width: '100%', ...props.sx }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: '8px',
          ...variantStyles,
          ...sizeStyles,
        }}
      >
        <Table stickyHeader={stickyHeader} size={size}>
          <TableHead sx={{ backgroundColor: headerBgColor }}>
            <TableRow>
              {/* Checkbox column */}
              {selectable && (
                <TableCell padding="checkbox" sx={{ color: headerTextColor }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    sx={{
                      color: headerTextColor,
                      '&.Mui-checked': {
                        color: headerTextColor,
                      },
                    }}
                  />
                </TableCell>
              )}

              {/* Column headers */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                  sx={{ 
                    color: headerTextColor,
                    fontWeight: 600,
                  }}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: `${headerTextColor} !important`,
                        },
                        color: headerTextColor,
                      }}
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
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body2">
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body2">
                    {emptyStateMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const isItemSelected = selectable && isSelected(row[rowIdField]);
                const rowId = row[rowIdField];
                
                return (
                  <TableRow
                    hover={highlightOnHover}
                    onClick={(event) => {
                      if (selectable) {
                        handleClick(event, rowId);
                      }
                      if (onRowClick) {
                        onRowClick(row);
                      }
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={rowId}
                    selected={isItemSelected}
                    sx={{
                      cursor: (onRowClick || selectable) ? 'pointer' : 'default',
                      backgroundColor: zebra && index % 2 === 1 ? theme.palette.action.hover : 'inherit',
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          sx={{
                            '&.Mui-checked': {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                      >
                        {column.renderCell ? column.renderCell(row) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={rowsPerPageLabel}
        />
      )}
    </Box>
  );
};

StandardTable.propTypes = {
  /**
   * Columns configuration
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right', 'center']),
      sortable: PropTypes.bool,
      renderCell: PropTypes.func,
    })
  ).isRequired,
  
  /**
   * Data to display in the table
   */
  data: PropTypes.array.isRequired,
  
  /**
   * Initial sort column
   */
  initialSortBy: PropTypes.string,
  
  /**
   * Initial sort direction
   */
  initialSortDirection: PropTypes.oneOf(['asc', 'desc']),
  
  /**
   * Function to call when a row is clicked
   */
  onRowClick: PropTypes.func,
  
  /**
   * Function to call when selection changes
   */
  onSelectionChange: PropTypes.func,
  
  /**
   * Whether rows are selectable
   */
  selectable: PropTypes.bool,
  
  /**
   * Whether the table is in a loading state
   */
  loading: PropTypes.bool,
  
  /**
   * Whether to show pagination
   */
  pagination: PropTypes.bool,
  
  /**
   * Options for rows per page
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  
  /**
   * Default rows per page
   */
  defaultRowsPerPage: PropTypes.number,
  
  /**
   * Whether the header is sticky
   */
  stickyHeader: PropTypes.bool,
  
  /**
   * Message to display when there is no data
   */
  emptyStateMessage: PropTypes.string,
  
  /**
   * Field to use as row ID
   */
  rowIdField: PropTypes.string,
  
  /**
   * Label for rows per page
   */
  rowsPerPageLabel: PropTypes.string,
  
  /**
   * Whether to show zebra striping
   */
  zebra: PropTypes.bool,
  
  /**
   * Whether to highlight rows on hover
   */
  highlightOnHover: PropTypes.bool,
  
  /**
   * Background color for the header
   */
  headerBackgroundColor: PropTypes.string,
  
  /**
   * Variant of the table
   */
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'elevated']),
  
  /**
   * Size of the table
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default StandardTable;
