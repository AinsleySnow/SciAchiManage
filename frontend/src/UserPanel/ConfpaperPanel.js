import { Button, Grid } from "@mui/material";
import * as React from "react";
import { REACT_URL } from "../Constants";
import { MessageBar } from "../MessageBar";
import { ConfpaperInfo } from "./ApplyForm";
import { AddConfpaper, DeleteConfpaper, GetConfpaper, SetConfpaperInfo } from "./Common";


export function AddConfpaperPanel() {
  var id = '';
  var cid = '';
  var title = '';
  var author = '';
  var page = '';
  var publish_date = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleConfpaperChange = (dict) => {
    cpdict = { ...dict };
  };

  var cpdict = {
    id: id,
    cid: cid,
    title: title,
    author: author,
    page: page,
    publish_date: publish_date,
    link: link
  };

  const doAddition = () => {
    console.log(cpdict);
    AddConfpaper(cpdict);
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
      <ConfpaperInfo
        onConfpaperChange={handleConfpaperChange}
        cid={cid}
        title={title}
        page={page}
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


export function ConfpaperInfoEdit(props) {
  const [id, setId] = React.useState(props.id);
  const [cid, setCid] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [page, setPage] = React.useState('');
  const [publish_date, setPublishDate] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    GetConfpaper(props.id)
      .then((data) => {
        setId(data['id']);
        setCid(data['cid']);
        setTitle(data['title']);
        setAuthor(data['author']);
        setPage(data['page']);
        setPublishDate(data['publish_date']);
        setLink(data['link']);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleConfpaperChange = (dict) => {
    cpdict = { ...dict };
  };

  const doUpdate = (e) => {
    var succeed = SetConfpaperInfo(cpdict);
    if (!succeed)
      setOpen(true);
    if (id != props.id)
      props.id = id;
  };

  const doDelete = (e) => {
    DeleteConfpaper(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/conference/'),
        f => setOpen(true));
  };

  var cpdict = {
    id: id,
    cid: cid,
    title: title,
    author: author,
    page: page,
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
      <ConfpaperInfo
        onConfpaperChange={handleConfpaperChange}
        id={id}
        cid={cid}
        title={title}
        author={author}
        page={page}
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
