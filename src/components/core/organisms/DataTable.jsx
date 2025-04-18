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
  Chip,
  IconButton,
  Typography,
  Checkbox,
  Tooltip,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { colors } from '../../../theme/themeConfig';

/**
 * DataTable component for displaying tabular data with sorting, pagination, and row selection
 * 
 * @component
 * @example
 * <DataTable
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
const DataTable = ({
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
  actionColumn,
  expandableRows = false,
  renderExpandedRow,
  ...props
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [selected, setSelected] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

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

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  // Handle row selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row[rowIdField]);
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

  // Handle single row selection
  const handleRowSelect = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  // Handle row expansion
  const handleRowExpand = (event, id) => {
    event.stopPropagation();
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Check if a row is expanded
  const isExpanded = (id) => Boolean(expandedRows[id]);

  // Sort function
  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Handle null or undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortBy, sortDirection]);

  // Pagination
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage, pagination]);

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `1px solid ${colors.divider}`,
          boxShadow: 'none',
        };
      case 'elevated':
        return {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        };
      case 'compact':
        return {
          border: `1px solid ${colors.divider}`,
          boxShadow: 'none',
          '& .MuiTableCell-root': {
            padding: '8px 16px',
          },
        };
      case 'default':
      default:
        return {
          border: `1px solid ${colors.divider}`,
          boxShadow: 'none',
        };
    }
  };

  // Get size styles
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
            padding: '16px 16px',
          },
        };
      case 'medium':
      default:
        return {
          '& .MuiTableCell-root': {
            padding: '12px 16px',
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Get header background color
  const headerBgColor = headerBackgroundColor || (variant === 'default' ? '#838C9D' : '#F8F9FA');
  const headerTextColor = headerBackgroundColor ? theme.palette.getContrastText(headerBackgroundColor) : 
                          (variant === 'default' ? '#FFFFFF' : colors.text.primary);

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
        <Table stickyHeader={stickyHeader}>
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

              {/* Expandable row column */}
              {expandableRows && (
                <TableCell padding="checkbox" sx={{ color: headerTextColor }} />
              )}

              {/* Data columns */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{ 
                    color: headerTextColor,
                    fontWeight: 600,
                    whiteSpace: column.noWrap ? 'nowrap' : 'normal',
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                      sx={{
                        color: headerTextColor,
                        '&.MuiTableSortLabel-active': {
                          color: headerTextColor,
                        },
                        '& .MuiTableSortLabel-icon': {
                          color: `${headerTextColor} !important`,
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              {/* Action column */}
              {actionColumn && (
                <TableCell
                  align="center"
                  sx={{ 
                    color: headerTextColor,
                    fontWeight: 600,
                  }}
                >
                  {actionColumn.label || 'Actions'}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + 
                    (selectable ? 1 : 0) + 
                    (expandableRows ? 1 : 0) + 
                    (actionColumn ? 1 : 0)
                  }
                  align="center"
                  sx={{ py: 4 }}
                >
                  <CircularProgress size={32} />
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + 
                    (selectable ? 1 : 0) + 
                    (expandableRows ? 1 : 0) + 
                    (actionColumn ? 1 : 0)
                  }
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body1" color="textSecondary">
                    {emptyStateMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const isItemSelected = isSelected(row[rowIdField]);
                const isRowExpanded = isExpanded(row[rowIdField]);
                const labelId = `table-checkbox-${index}`;

                return (
                  <React.Fragment key={row[rowIdField]}>
                    <TableRow
                      hover={highlightOnHover}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{
                        cursor: onRowClick ? 'pointer' : 'default',
                        ...(zebra && {
                          '&:nth-of-type(odd)': {
                            backgroundColor: '#F8F8F9',
                          },
                        }),
                        ...(highlightOnHover && {
                          '&:hover': {
                            backgroundColor: '#f0f7ff',
                          },
                        }),
                      }}
                    >
                      {/* Checkbox cell */}
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={(event) => handleRowSelect(event, row[rowIdField])}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      )}

                      {/* Expandable row control */}
                      {expandableRows && (
                        <TableCell padding="checkbox">
                          <IconButton
                            size="small"
                            onClick={(event) => handleRowExpand(event, row[rowIdField])}
                            aria-label="expand row"
                          >
                            {isRowExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                      )}

                      {/* Data cells */}
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align || 'left'}
                            sx={{
                              whiteSpace: column.noWrap ? 'nowrap' : 'normal',
                              ...(column.sx ? column.sx : {}),
                            }}
                          >
                            {column.renderCell ? column.renderCell(row) : value}
                          </TableCell>
                        );
                      })}

                      {/* Action cell */}
                      {actionColumn && (
                        <TableCell align="center">
                          {actionColumn.renderCell ? (
                            actionColumn.renderCell(row)
                          ) : (
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (actionColumn.onClick) {
                                  actionColumn.onClick(row);
                                }
                              }}
                              sx={{
                                width: '40px',
                                height: '40px',
                                border: '1px solid #CED1D7',
                                borderRadius: '100px',
                              }}
                            >
                              {actionColumn.icon || <ChevronRightIcon />}
                            </IconButton>
                          )}
                        </TableCell>
                      )}
                    </TableRow>

                    {/* Expandable row content */}
                    {expandableRows && isRowExpanded && renderExpandedRow && (
                      <TableRow>
                        <TableCell
                          colSpan={
                            columns.length + 
                            (selectable ? 1 : 0) + 
                            (expandableRows ? 1 : 0) + 
                            (actionColumn ? 1 : 0)
                          }
                          sx={{ 
                            paddingTop: 0, 
                            paddingBottom: 0,
                            backgroundColor: '#FAFAFA',
                          }}
                        >
                          <Box sx={{ py: 2 }}>
                            {renderExpandedRow(row)}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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

DataTable.propTypes = {
  /**
   * Columns configuration
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      align: PropTypes.oneOf(['left', 'right', 'center']),
      sortable: PropTypes.bool,
      renderCell: PropTypes.func,
      noWrap: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sx: PropTypes.object,
    })
  ).isRequired,

  /**
   * Data array
   */
  data: PropTypes.array.isRequired,

  /**
   * Initial sort field
   */
  initialSortBy: PropTypes.string,

  /**
   * Initial sort direction
   */
  initialSortDirection: PropTypes.oneOf(['asc', 'desc']),

  /**
   * Row click handler
   */
  onRowClick: PropTypes.func,

  /**
   * Selection change handler
   */
  onSelectionChange: PropTypes.func,

  /**
   * Whether rows are selectable
   */
  selectable: PropTypes.bool,

  /**
   * Whether the table is in loading state
   */
  loading: PropTypes.bool,

  /**
   * Whether to show pagination
   */
  pagination: PropTypes.bool,

  /**
   * Rows per page options
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
  emptyStateMessage: PropTypes.node,

  /**
   * Field to use as row ID
   */
  rowIdField: PropTypes.string,

  /**
   * Label for rows per page
   */
  rowsPerPageLabel: PropTypes.node,

  /**
   * Whether to use zebra striping
   */
  zebra: PropTypes.bool,

  /**
   * Whether to highlight rows on hover
   */
  highlightOnHover: PropTypes.bool,

  /**
   * Header background color
   */
  headerBackgroundColor: PropTypes.string,

  /**
   * Table variant
   */
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'compact']),

  /**
   * Table size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * Action column configuration
   */
  actionColumn: PropTypes.shape({
    label: PropTypes.node,
    renderCell: PropTypes.func,
    onClick: PropTypes.func,
    icon: PropTypes.node,
  }),

  /**
   * Whether rows are expandable
   */
  expandableRows: PropTypes.bool,

  /**
   * Render function for expanded row content
   */
  renderExpandedRow: PropTypes.func,

  /**
   * Additional styles
   */
  sx: PropTypes.object,
};

export default DataTable;
