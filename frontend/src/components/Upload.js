import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextEditor from './TextEditor';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function Upload(){
  const [, setFiles] = useState([]);
  const [article, setArticle] = useState({});
  const [showTranslated, setShowTranslated] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleFileUpload(files) {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', files[0]);
    fetch('/api/file-upload', {
      method: "POST", body: formData
    }).then(function(response){
      if(response.status === 200){
        setLoading(false);
        return response.json();
      }
    }).then(function(response){
      setLoading(false);
      if(response !== undefined){
        setArticle(response);
      }
    });
    setFiles([]);
  }

  return(
    <>
      <DropzoneArea
        onChange={handleFileUpload}
        style={{marginBottom: "10px"}}
      />
      {loading && <LinearProgress style={{width: "100%"}} />}
      {Object.keys(article).length !== 0 &&
      <>
        <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
          Summary
        </Typography>
        <Typography color="textSecondary" component="p" style={{marginBottom: "10px"}}>
          {article.summary}
        </Typography>
        <ButtonGroup variant="outlined" color="primary" size="large" style={{marginBottom: "10px"}}>
          <Button
            color={showTranslated ? "default": "primary"}
            onClick={() => setShowTranslated(!showTranslated)}
          >
            MS
          </Button>
          <Button
            color={showTranslated ? "primary": "default"}
            onClick={() => setShowTranslated(!showTranslated)}
          >
            EN
          </Button>
        </ButtonGroup>
        {!showTranslated &&
          <TextEditor text={article.text} />
        }
        {showTranslated &&
          <TextEditor text={article.translated_text} />
        }
      </>
      }
    </>
  );
}
