import * as React from "react";
import { ConferenceInfo } from "./ApplyForm";
import { AddConf, DeleteConf, GetConf, SetConfInfo } from "./Common";


export function AddConfPanel() {
  var issn = '';
  var title = '';
  var authority = '';
  var host = '';
  var city = '';
  var address = '';
  var postcode = '';
  var phone_num = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleConfChange = (dict) => {
    npdict = { ...dict };
  };

  var npdict = {
    issn: issn,
    title: title,
    authority: authority,
    host: host,
    city: city,
    address: address,
    postcode: postcode,
    phone_num: phone_num,
    link: link
  };

  const doAddition = () => {
    AddConf(npdict)
      .then((success) => window.location.assign(REACT_URL + '/my/users'),
        (failure) => setOpen(true));
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
      <ConfInfo
        onConfChange={handleConfChange}
        issn={issn}
        title={title}
        host={host}
        city={city}
        address={address}
        postcode={postcode}
        phone_num={phone_num}
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


export function ConfInfoEdit(props) {
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [time, setTime] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [association, setAssociation] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [publish_date, setPublishDate] = React.useState('');
  const [chief_editor, setChiefEditor] = React.useState('');
  const [editors, setEditors] = React.useState('');
  const [link, setLink] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  var loadfinish = false;
  React.useEffect(() => {
    GetConf(uid, props.id)
      .then((data) => {
        setId(data['id']);
        setName(data['title']);
        setTime(data['authority']);
        setPlace(data['host']);
        setAssociation(data['city']);
        setPublisher(data['address']);
        setPublishDate(data['postcode']);
        setChiefEditor(data['phone_num']);
        setEditors(data['editors']);
        setLink(data['link']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleConfChange = (dict) => {
    confdict = { ...dict };
    confUpdated = true;
  };

  const doUpdate = (e) => {
    if (!loadfinish)
      return;
    if (confUpdated) {
      var succeed = SetConfInfo(props.id, confdict);
      if (!succeed)
        setOpen(true);
      if (id != props.id)
        props.id = id;
    }
  };

  const doDelete = (e) => {
    DeleteConf(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/conference/'),
        f => setOpen(true));
  };

  var confUpdated = false;
  var confdict = {
    id: id,
    name: name,
    time: time,
    place: place,
    association: association,
    publisher: publisher,
    publish_date: publish_date,
    chief_editor: chief_editor,
    editors: editors,
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
      <ConferenceInfo
        onConfChange={handleConfChange}
        id={id}
        name={name}
        time={time}
        place={place}
        association={association}
        publisher={publisher}
        publish_date={publish_date}
        chief_editor={chief_editor}
        editors={editors}
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
