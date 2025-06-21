import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Specification {
    specificationId: string;
    productId: string;
    key: string;
    value: string;
}

interface Props {
    specifications: Specification[];
}

const SpecificationPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
}));

const SpecificationRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderBottom: '1px solid #eee',
    padding: theme.spacing(2, 0),
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const SpecificationLabel = styled(Typography)(({ theme }) => ({
    flex: '0 0 200px',
    fontWeight: 700,
    color: '#000',
    paddingRight: theme.spacing(3),
}));

const SpecificationValue = styled(Typography)({
    flex: 1,
    color: '#666',
});


const SpecificationsComponent: React.FC<Props> = ({ specifications }) => {
    const formatKey = (key: string) => {
        return key.replace(/_/g, ' ').replace(/\b/g, char => char.toUpperCase());
    };

    return (
        <Box sx={{ p: 2, maxWidth: '1200px', margin: '0 auto' }}>
            <SpecificationPaper elevation={0}>
                {specifications.map((spec, index) => (
                    <SpecificationRow key={spec.specificationId}>
                        <SpecificationLabel variant="body2">
                            {formatKey(spec.key)}
                        </SpecificationLabel>
                        <SpecificationValue variant="body2">
                            {spec.value}
                        </SpecificationValue>
                    </SpecificationRow>
                ))}
            </SpecificationPaper>
        </Box>
    );
};

export default SpecificationsComponent;