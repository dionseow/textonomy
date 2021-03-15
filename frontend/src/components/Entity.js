import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EntityCard from './entity/EntityCard.js'
import TrendGraph from './entity/TrendGraph.js';
import RelatedArticlesTable from './entity/RelatedArticlesTable.js';
import RadialGraph from './entity/RadialGraph.js';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function Entity({ match }){
  const classes = useStyles();
  const [entity, setEntity] = useState({});

  useEffect(() => {
    fetchEntity();
  }, []);

  const fetchEntity = async () => {
    const data = await fetch(`/api/entities/${match.params.id}`);
    const entityData = await data.json();
    setEntity(entityData);
    console.log(entityData);
  }
  return (
    <>
      {Object.keys(entity).length !== 0 &&
      <>
      <Typography style={{fontWeight: "bold", padding: "5px"}}>Overview</Typography>
      <Grid container spacing={3}>
        <EntityCard icon={"name"} name={entity.Name} description={"Entity Name"} />
        <EntityCard icon={"type"} name={entity.Type} description={"Entity Type"} />
        <EntityCard icon={"mentioned"} name={entity.ArticlesMentioned} description={"Mentioned in"} />
        <EntityCard icon={"co-occuringPer"} name={entity.PER} description={"Most co-occuring person"} />
        <EntityCard icon={"co-occuringLoc"} name={entity.LOC} description={"Most co-occuring location"} />
        <EntityCard icon={"co-occuringOrg"} name={entity.ORG} description={"Most co-occuring organization"} />
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography> (WIP) Occurence over time</Typography>
            <TrendGraph />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography> (WIP) Category breakdown</Typography>
            <RadialGraph />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <RelatedArticlesTable data={entity.sim_ents} />
        </Grid>
      </Grid>
      </>
      }
    </>
  );
}
