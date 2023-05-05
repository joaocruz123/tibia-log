import PropTypes from 'prop-types';
import { Avatar, CardContent, Paper, Stack, Typography } from '@mui/material';

export const AppWidgetSummary = (props) => {
  const { value, sx, icon, title, color } = props;

  return (
    <Paper sx={sx} elevation={0}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          justifyItems="center"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#383838' }}>
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Paper>
  );
};

AppWidgetSummary.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};

export default AppWidgetSummary;