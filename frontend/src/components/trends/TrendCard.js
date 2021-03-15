import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TrendCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid item xs={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.word}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.type}
          </Typography>
          {props.change.includes("+") ?
            <>
            <Typography variant="h4" color="primary">
              {props.change}
            <TrendingUpIcon />
            </Typography>
            </>
            :
            <>
            <Typography variant="h4" color="secondary">
              {props.change}
            <TrendingDownIcon />
            </Typography>
            </>
            }
        </CardContent>
        <CardActions>
          <Button size="small">Word Overview</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
