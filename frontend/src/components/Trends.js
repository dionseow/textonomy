import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TrendCard from './trends/TrendCard.js';
import MultiTrendGraph from './trends/MultiTrendGraph';


export default function Trends() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Trending insights for today</Typography>
          <Grid container spacing={5}>
            <TrendCard word={"Donald Trump"} type={"PER"} change={"+1000%"} />
            <TrendCard word={"Joe Biden"} type={"PER"} change={"+600%"} />
            <TrendCard word={"WHO"} type={"ORG"} change={"-500%"} />
            <TrendCard word={"China"} type={"LOC"} change={"-400%"} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <MultiTrendGraph />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
