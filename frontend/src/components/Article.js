import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import  { makeStyles, withStyles } from '@material-ui/core/styles';
import TextEditor from './TextEditor.js';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: '5px'
  },
}))


export default function Article({ match }){
  const classes = useStyles();
  const [article, setArticle] = useState({});
  const [showTranslated, setShowTranslated]  = useState(false);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    const data = await fetch(`/api/articles/${match.params.id}`);
    const articleData = await data.json();
    setArticle(articleData);
  }

  return (
    <>
      {Object.keys(article).length !== 0 &&
      <>
      {article.persons.length !== 0 &&
      <Grid item xs={12}>
        <Typography className={classes.padding} variant="h4">Persons</Typography>
        {article.persons.map(item => {
          return <Button
                    href={`/entities/${item.id}`}
                    variant="outlined"
                    color="primary"
                    endIcon={<PersonIcon />}
                    size="small">{item.name}</Button>
        })}
      </Grid>
      }
      {article.locations.length !== 0 &&
      <Grid item xs={12}>
        <Typography className={classes.padding} variant="h4">Locations</Typography>
        {article.locations.map(item => {
          return <Button
                    className={classes.root}
                    href={`/entities/${item.id}`}
                    variant="outlined"
                    color="primary"
                    endIcon={<LocationOnIcon />}
                    size="small">{item.name}</Button>
        })}
      </Grid>
      }
      { article.organizations.length !== 0 &&
      <Grid item xs={12}>
        <Typography className={classes.padding} variant="h4">Organizations</Typography>
        {article.organizations.map(item => {
          return <Button
                    href={`/entities/${item.id}`}
                    variant="outlined"
                    color="primary"
                    endIcon={<LocationCityIcon />}
                    size="small">{item.name}</Button>
        })}
      </Grid>
      }
      <Grid item xs={12}>
        <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
          Summary
        </Typography>
        <Typography color="textSecondary" component="p" style={{marginBottom: "10px"}}>
          {article.summary}
        </Typography>
        <ButtonGroup variant="outlined" color="primary" size="large" style={{marginBottom: "10px"}}>
          <Button
            color={showTranslated ? "default" : "primary"}
            onClick={() => setShowTranslated(!showTranslated)}
          >
            {article.language}
          </Button>
          <Button
            color={showTranslated ? "primary": "default"}
            onClick={() => setShowTranslated(!showTranslated)}
          >
            EN
          </Button>
        </ButtonGroup>
        {!showTranslated &&
          <TextEditor text={article.text}/>
        }
        {showTranslated &&
          <TextEditor text={article.translated_text} />
        }
      </Grid>
      </>
    }
    </>
  )
}


