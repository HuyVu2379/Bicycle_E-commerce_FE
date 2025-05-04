import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Checkbox,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Toolbar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

interface DataRow {
  id: number;
  stt: number;
  name: string;
  description: string;
  module: string;
  status: "active" | "inactive";
  action: string;
  details: string;
}

const initialData: DataRow[] = [
  {
    id: 1,
    stt: 1,
    name: "Đơn hàng",
    description: "Mô tả đơn hàng",
    module: "Bán hàng",
    status: "active",
    action: "",
    details: "",
  },
  {
    id: 2,
    stt: 2,
    name: "Sản phẩm",
    description: "Mô tả sản phẩm",
    module: "Kho hàng",
    status: "active",
    action: "",
    details: "",
  },
  {
    id: 3,
    stt: 3,
    name: "Hóa đơn thuế",
    description: "Mô tả hóa đơn thuế",
    module: "Kế toán",
    status: "inactive",
    action: "",
    details: "",
  },
  {
    id: 4,
    stt: 4,
    name: "Công nợ khách hàng",
    description: "Mô tả công nợ",
    module: "Kế toán",
    status: "active",
    action: "",
    details: "",
  },
  {
    id: 5,
    stt: 5,
    name: "Báo cáng",
    description: "Mô tả báo cáo",
    module: "Báo cáo",
    status: "active",
    action: "",
    details: "",
  },
  {
    id: 6,
    stt: 6,
    name: "Tồn kho",
    description: "Mô tả tồn kho",
    module: "Kho hàng",
    status: "active",
    action: "",
    details: "",
  },
  {
    id: 7,
    stt: 7,
    name: "Lịch sử",
    description: "Mô tả lịch sử",
    module: "Hệ thống",
    status: "active",
    action: "",
    details: "",
  },
];

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(initialData);
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{ width: "100%", mb: 2, borderRadius: "8px", overflow: "hidden" }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel id="rows-label">Số dòng</InputLabel>
              <Select
                labelId="rows-label"
                id="rows-select"
                defaultValue={10}
                label="Số dòng"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150, mr: 2 }}>
              <InputLabel id="filter-label">Tình trạng</InputLabel>
              <Select
                labelId="filter-label"
                id="filter-select"
                defaultValue="all"
                label="Tình trạng"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="active">Đang hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#4caf50",
                "&:hover": { bgcolor: "#388e3c" },
                borderRadius: "4px",
              }}
            >
              Thêm mới
            </Button>
          </Box>
        </Toolbar>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f9f9f9" }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  STT
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Danh mục</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Mô tả</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Module</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Trạng thái
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Thao tác
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Hiển thị
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Tùy chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={() => handleSelect(row.id)}
                      />
                    </TableCell>
                    <TableCell align="center">{row.stt}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.module}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          row.status === "active" ? "Sử dụng" : "Không sử dụng"
                        }
                        color={row.status === "active" ? "success" : "default"}
                        size="small"
                        sx={{ minWidth: "100px" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{
                          bgcolor: "#e3f2fd",
                          mr: 1,
                          "&:hover": { bgcolor: "#bbdefb" },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        sx={{
                          bgcolor: "#ffebee",
                          "&:hover": { bgcolor: "#ffcdd2" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox defaultChecked />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;
