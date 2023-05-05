import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function CustomBreadcrumbs({ breadcrumbs }) {
    return (
        <Stack spacing={2} >
            <Breadcrumbs
                sx={{ fontSize: '13px' }}
                separator={<ArrowForwardIosIcon sx={{ fontSize: 10 }} />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}

export default CustomBreadcrumbs;