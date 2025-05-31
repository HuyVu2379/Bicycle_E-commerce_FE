import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Category } from '@/pages/admin/Product';
interface CategoryDialogProps {
    open: boolean;
    newCategory: Category;
    setNewCategory: (value: Category) => void;
    handleAddCategory: () => void;
    handleClose: () => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
    open,
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleClose,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogContent>                <TextField
                autoFocus
                margin="dense"
                label="Tên danh mục"
                fullWidth
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& input": {
                            paddingY: "26px",
                        },
                    },
                }}
            />
                <TextField
                    margin="dense"
                    label="Mô tả"
                    fullWidth
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                        },
                    }}
                />
            </DialogContent>            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleAddCategory} disabled={!newCategory.name || !newCategory.description}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryDialog;