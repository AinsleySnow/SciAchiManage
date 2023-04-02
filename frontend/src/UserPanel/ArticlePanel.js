import { Button, Grid } from "@mui/material";
import * as React from "react";
import { REACT_URL } from "../Constants";
import { MessageBar } from "../MessageBar";
import { ArticleInfo } from "./ApplyForm";
import { AddArticle, DeleteArticle, GetArticle, SetArticleInfo } from "./Common";


export function AddArticlePanel() {
  var id = '';
  var issn = '';
  var title = '';
  var author = '';
  var version = '';
  var publish_date = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleArticleChange = (dict) => {
    adict = { ...dict };
  };

  var adict = {
    id: id,
    issn: issn,
    title: title,
    author: author,
    version: version,
    publish_date: publish_date,
    link: link
  };

  const doAddition = () => {
    AddArticle(adict);
    window.location.assign(REACT_URL + '/my/achi');
  }

  return (
    <Grid>
      <MessageBar
        open={open}
        dura={3000}
        state='error'
        onClose={handleClose}
      >
        出错了！
      </MessageBar>
      <ArticleInfo
        onArticleChange={handleArticleChange}
        issn={issn}
        title={title}
        author={author}
        version={version}
        publish_date={publish_date}
        link={link}
      />
      <Button
        sx={{ marginTop: 4 }}
        variant='contained'
        onClick={doAddition}
      >
        确定
      </Button>
    </Grid>
  );
}


export function ArticleInfoEdit(props) {
  const [id, setId] = React.useState(props.id);
  const [issn, setIssn] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [version, setVersion] = React.useState('');
  const [publish_date, setPublishDate] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    GetArticle(props.id)
      .then((data) => {
        setId(data['id']);
        setIssn(data['issn']);
        setTitle(data['title']);
        setAuthor(data['author']);
        setVersion(data['version']);
        setPublishDate(data['publish_date']);
        setLink(data['link']);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleArticleChange = (dict) => {
    adict = { ...dict };
  };

  const doUpdate = (e) => {
    var succeed = SetArticleInfo(adict);
    if (!succeed)
      setOpen(true);
    if (id != props.id)
      props.id = id;
  };

  const doDelete = (e) => {
    DeleteArticle(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/conference/'),
        f => setOpen(true));
  };

  var adict = {
    id: id,
    issn: issn,
    title: title,
    author: author,
    version: version,
    publish_date: publish_date,
    link: link
  };

  return (
    <Grid>
      <MessageBar
        open={open}
        dura={3000}
        state='error'
        onClose={handleClose}
      >
        出错了！
      </MessageBar>
      <ArticleInfo
        onArticleChange={handleArticleChange}
        id={id}
        issn={issn}
        title={title}
        author={author}
        version={version}
        publish_date={publish_date}
        link={link}
      />
      <Button
        sx={{
          marginTop: 4,
          marginRight: 4
        }}
        variant='contained'
        color='success'
        onClick={doUpdate}
      >
        确认更改
      </Button>
      <Button
        sx={{
          marginTop: 4,
        }}
        variant='contained'
        color='error'
        onClick={doDelete}
      >
        删除
      </Button>
    </Grid>
  );
}
