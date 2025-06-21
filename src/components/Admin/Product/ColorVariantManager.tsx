import React from 'react';
import { Grid, Typography, Box, Button, TextField, ImageList, ImageListItem } from '@mui/material';
import { GalleryPhoto } from '@/pages/admin/Product';

interface ColorVariantManagerProps {
    colors: string[];
    quantities: { [color: string]: number };
    images: { [color: string]: string[] };
    photos: GalleryPhoto[];
    handleImageChange: (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleQuantityChange: (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    renderImage: ({ index, photo }: { index: number; photo: GalleryPhoto }) => JSX.Element;
    handleDeleteImage: (color: string, image: string) => void;
}

const ColorVariantManager: React.FC<ColorVariantManagerProps> = ({
    colors,
    quantities,
    images,
    photos,
    handleImageChange,
    handleQuantityChange,
    renderImage,
    handleDeleteImage,
}) => {
    return (
        <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Ảnh và số lượng theo màu</Typography>
            {colors.length > 0 ? (
                colors.map((color) => (
                    <Box
                        key={color}
                        sx={{
                            mb: 3,
                            p: 2,
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>{color}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                    backgroundColor: 'white',
                                    fontSize: '14px',
                                    '&:hover': {
                                        backgroundColor: '#0068FF',
                                        color: 'white',
                                    },
                                }}
                            >
                                Chọn ảnh cho {color}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageChange(color)}
                                />
                            </Button>
                            <TextField
                                label={`Số lượng (${color})`}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={quantities[color] || ''}
                                onChange={handleQuantityChange(color)}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 1,
                                    width: '150px',
                                    '& .MuiOutlinedInput-root': {
                                        '& input': {
                                            paddingY: '20px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'blue',
                                        },
                                    },
                                }}
                                variant="outlined"
                            />
                        </Box>
                        {images[color]?.length > 0 && (
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Ảnh đã chọn ({images[color].length}):
                                </Typography>                                <ImageList cols={4} rowHeight={100}>
                                    {photos.filter((photo) => photo.color === color).map((photo, index) => (
                                        <ImageListItem key={index}>
                                            <img
                                                src={photo.src}
                                                alt={`${color} ${index}`}
                                                style={{ objectFit: 'cover', cursor: 'pointer' }}
                                                onClick={() => renderImage({ index, photo })}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>
                        )}
                    </Box>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Vui lòng chọn ít nhất một màu để thêm ảnh và số lượng.
                </Typography>
            )}
        </Grid>
    );
};

export default ColorVariantManager;