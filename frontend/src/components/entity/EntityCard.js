import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PeopleIcon from '@material-ui/icons/People';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  }
}))

export default function EntityCard(props){
  const classes = useStyles();
  let icon = null;

  switch (props.icon) {
    case 'name':
      icon = <AccountCircleIcon />;
      break;

    case 'type':
      icon = <InfoIcon />;
      break;

    case 'mentioned':
      icon = <BookmarksIcon />;
      break;

    case 'co-occuringLoc':
      icon = <LocationOnIcon />;
      break;

    case 'co-occuringPer':
      icon = <PeopleIcon />;
      break;

    case 'co-occuringOrg':
      icon = <HomeWorkIcon />;
      break;
  }

  return (
    <Grid item xs={3}>
      <CardActionArea>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap'}}
              >
                {icon}
                <Typography
                  component="h2"
                  fontWeight={2000}
                  style={{marginLeft: '5px', fontWeight: 'bold'}}>
                  {props.name}
                </Typography>
              </div>
              <Typography variant="subtitle2" color="textSecondary" style={{marginLeft: '30px'}}>
                {props.description}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
