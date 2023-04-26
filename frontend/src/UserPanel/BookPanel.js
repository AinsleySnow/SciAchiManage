import { Button, Grid } from "@mui/material";
import * as React from "react";
import { REACT_URL } from "../Constants";
import { MessageBar } from "../MessageBar";
import { BookInfo } from "./ApplyForm";
import { AddBook, DeleteBook, GetBook, SetBookInfo } from "./Common";


export function AddBookPanel() {
  var isbn = '';
  var title = '';
  var author = '';
  var publisher = '';
  var publish_year = '';
  var place_published = '';
  var picture = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleBookChange = (dict) => {
    bdict = { ...dict };
  };

  var bdict = {
    isbn: isbn,
    title: title,
    author: author,
    publisher: publisher,
    publish_year: publish_year,
    place_published: place_published,
    picture: picture,
    link: link
  };

  const doAddition = () => {
    AddBook(bdict);
    window.location.assign(REACT_URL + '/my/published');
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
      <BookInfo
        onBookChange={handleBookChange}
        isbn={isbn}
        title={title}
        author={author}
        publisher={publisher}
        publish_year={publish_year}
        place_published={place_published}
        picture={''}
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


export function BookInfoEdit(props) {
  const [isbn, setIsbn] = React.useState(props.isbn);
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [publish_year, setPY] = React.useState('');
  const [place_published, setPP] = React.useState('');
  const [picture, setPicture] = React.useState('');
  const [link, setLink] = React.useState('');

  var loadfinish = false;
  React.useEffect(() => {
    GetBook(props.isbn)
      .then((data) => {
        setIsbn(data['isbn']);
        setTitle(data['title']);
        setAuthor(data['author']);
        setPublisher(data['publisher']);
        setPY(data['publish_year']);
        setPP(data['place_published']);
        setPicture(data['picture']);
        setLink(data['link']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleBookChange = (dict) => {
    bdict = { ...dict };
    bUpdated = true;
  };

  const doUpdate = (e) => {
    var succeed = SetBookInfo(bdict);
    if (!succeed)
      setOpen(true);
    if (isbn != props.isbn)
      props.isbn = isbn;
  };

  const doDelete = (e) => {
    DeleteBook(props.isbn)
      .then(s => window.location.replace(REACT_URL + 'my/achi'),
        f => setOpen(true));
  };

  var bUpdated = false;
  var bdict = {
    isbn: isbn,
    title: title,
    author: author,
    publisher: publisher,
    publish_year: publish_year,
    place_published: place_published,
    picture: picture,
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
      <BookInfo
        onBookChange={handleBookChange}
        isbn={isbn}
        title={title}
        author={author}
        publisher={publisher}
        publish_year={publish_year}
        place_published={place_published}
        picture={picture}
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
