import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArticleTable from './ArticleTable';
import EntityTable from './EntityTable';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NoteIcon from '@material-ui/icons/Note';
import PersonIcon from '@material-ui/icons/Person';


export default function Index(){

  const [showArticle, setShowArticle] = useState(true);


  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ButtonGroup variant="text" color="primary" size="large">
            <Button
              endIcon={<NoteIcon />}
              color={showArticle ? "primary" : "default"}
              onClick={() => setShowArticle(!showArticle)}
            >
              Articles
            </Button>
            <Button
              endIcon={<PersonIcon />}
              color={!showArticle ? "primary": "default"}
              onClick={() => setShowArticle(!showArticle)}
            >
              Entities
            </Button>
          </ButtonGroup>
        </Grid>
        {showArticle &&
        <Grid item xs={12}>
          <ArticleTable />
        </Grid>
        }
        {!showArticle &&
        <Grid item xs={12}>
          <EntityTable />
        </Grid>
        }
      </Grid>
    </>
  )
}
