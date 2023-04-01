import { Button, Grid } from "@mui/material";
import * as React from "react";
import { REACT_URL } from "../Constants";
import { MessageBar } from "../MessageBar";
import { PaperInfo } from "./ApplyForm";
import { AddPaper, DeletePaper, GetPaper, SetPaperInfo } from "./Common";


export function AddPaperPanel() {
  var id = '';
  var issn = '';
  var title = '';
  var author = '';
  var page = '';
  var volume = '';
  var number = '';
  var publish_date = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePaperChange = (dict) => {
    paperdict = { ...dict };
  };

  var paperdict = {
    id: id,
    issn: issn,
    title: title,
    author: author,
    page: page,
    volume: volume,
    number: number,
    publish_date: publish_date,
    link: link
  };

  const doAddition = () => {
    AddPaper(paperdict);
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
      <PaperInfo
        onPaperChange={handlePaperChange}
        issn={issn}
        title={title}
        page={page}
        volume={volume}
        number={number}
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


export function PaperInfoEdit(props) {
  const [id, setId] = React.useState(props.id);
  const [issn, setIssn] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [page, setPage] = React.useState('');
  const [volume, setVolume] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [publish_date, setPublishDate] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    GetPaper(props.id)
      .then((data) => {
        setId(data['id']);
        setIssn(data['issn']);
        setTitle(data['title']);
        setAuthor(data['author']);
        setPage(data['page']);
        setVolume(data['volume']);
        setNumber(data['number']);
        setPublishDate(data['publish_date']);
        setLink(data['link']);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePaperChange = (dict) => {
    pdict = { ...dict };
  };

  const doUpdate = (e) => {
    console.log(pdict);
    var succeed = SetPaperInfo(pdict);
    if (!succeed)
      setOpen(true);
    if (id != props.id)
      props.id = id;
  };

  const doDelete = (e) => {
    DeletePaper(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/conference/'),
        f => setOpen(true));
  };

  var pdict = {
    id: id,
    issn: issn,
    title: title,
    author: author,
    page: page,
    volume: volume,
    number: number,
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
      <PaperInfo
        onPaperChange={handlePaperChange}
        id={id}
        issn={issn}
        title={title}
        author={author}
        page={page}
        volume={volume}
        number={number}
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
