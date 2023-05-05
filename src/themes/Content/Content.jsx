import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';

export default function SkeletonLoading(props) {
  const { active } = props;
  return (<>
    {active ? <Grid container spacing={8}>
      <Grid item xs>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={"70%"} height={50} />
          <Skeleton variant="rounded" width={"60%"} height={30} />
          <Skeleton variant="rounded" width={"50%"} height={20} />
          <Skeleton variant="rounded" width={"50%"} height={20} />
          <Skeleton variant="rounded" width={"60%"} height={20} />
          <Skeleton variant="rounded" width={"30%"} height={20} />
          <Skeleton variant="rounded" width={"40%"} height={20} />
        </Stack>
      </Grid>
    </Grid> :
      <>
        {props.children}
      </>
    }
  </>

  );
}