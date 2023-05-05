import * as React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconButton, Tooltip } from '@mui/material';

function InfoView({ content, placement }) {
    return (
        <Tooltip placement={placement} title={content} arrow>
            <IconButton aria-label="info" sx={{ fontSize: 14, padding: '2px' }}>
                <InfoOutlinedIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>

    );
}

export default InfoView;