/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";

import styles from './cart-list.module.scss';
import NoDataFound from "@/components/no-data/no-data.component";

interface TableProps {
  columns: any;
  data: any;
  length?: number;
  className?: string;
  checkboxColumn?: boolean;
  page: number;
  limit: number;
  setLimit: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  paginationDiff?: boolean;
}

export const CartList = (props: TableProps) => {
  const { columns, data, length, page, limit, setPage, setLimit, paginationDiff } = props;
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", maxHeight: "calc(100vh - 200px)", flex:1 }}>
      <Table sx={{ minWidth: 450 }} size="medium" className={styles.tableContainer}>
        <TableHead className={styles.tableHeader}>
          <TableRow className={styles.tableRow}>
            {data?.length ? (
              columns?.map((header: any) => (
                <TableCell
                  key={header?.name}
                  className={styles.tableCell}
                  sx={{
                    textAlign:
                      header?.name === "name" ||
                      header?.name === "employee" ||
                      header?.name === "email" ||
                      header?.name === "description"
                        ? "left"
                        : "center",
                  }}
                >
                  {header.label}
                </TableCell>
              ))
            ) : (
              <></>
            )}
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {data?.length ? (
            data?.map((row: any, idx: number) => (
              <TableRow key={idx} className={styles.tableRow}>
                {columns?.map((item: any, idx: number) => (
                  <TableCell
                    key={idx}
                    className={styles.tableCell}
                    sx={{
                      textAlign:
                        item?.name === "name" ||
                        item?.name === "employee" ||
                        item?.name === "email" ||
                        item?.name === "description"
                          ? "left"
                          : "center",
                    }}
                  >
                    {row[item?.name]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow
              className={styles.tableRow}
              sx={{
                height: "calc(100vh - 230px)",
                ":hover": { boxShadow: "none !important", transform: "none !important" },
              }}
            >
              <TableCell className="tableCell" align="center">
                <NoDataFound />
                <Typography sx={{ fontWeight: 600 }} variant="h6">
                  No data found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data?.length ? (
        <TablePagination
          slotProps={{
            actions: {
              nextButton: {
                title: "Go to next page",
              },
              previousButton: {
                title: "Go to previous page",
              },
            },
          }}
          height={"40px"}
          labelDisplayedRows={({ from, to, count }) => {
            return "" + from + "-" + to + " of " + count;
          }}
          className={styles.tablePaginationContainer}
          labelRowsPerPage={"Rows per page:"}
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={length ?? data?.length}
          rowsPerPage={limit}
          page={page}
          onPageChange={(e, page) => {
            setPage(page);
          }}
          onRowsPerPageChange={(e) => {
            setPage(0);
            if (paginationDiff) setLimit(parseInt(e.target.value));
            else {
              dispatch(setLimit(parseInt(e.target.value)));
            }
          }}
        />
      ) : (
        <></>
      )}
    </TableContainer>
  );
};
