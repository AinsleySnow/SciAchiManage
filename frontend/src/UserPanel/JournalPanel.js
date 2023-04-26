import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { REACT_URL } from '../Constants';
import { MessageBar } from '../MessageBar';
import { JournalInfo } from "./ApplyForm";
import { AddJournal, DeleteJournal, GetJournal, SetJournalInfo } from "./Common";


export function AddJournalPanel() {
  var issn = '';
  var title = '';
  var host = '';
  var period = '';
  var zone = '';
  var inf_factor = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleJourChange = (dict) => {
    jurdict = { ...dict };
  };

  var jurdict = {
    issn: issn,
    title: title,
    host: host,
    period: period,
    zone: zone,
    inf_factor: inf_factor,
    link: link
  };

  const doAddition = () => {
    AddJournal(jurdict);
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
      <JournalInfo
        onJourChange={handleJourChange}
        issn={issn}
        title={title}
        host={host}
        period={period}
        zone={zone}
        inf_factor={inf_factor}
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


export function JournalInfoEdit(props) {
  const [issn, setIssn] = React.useState(props.issn);
  const [title, setTitle] = React.useState('');
  const [host, setHost] = React.useState('');
  const [period, setPeriod] = React.useState('');
  const [zone, setZone] = React.useState('');
  const [inf_factor, setInfactor] = React.useState('');
  const [picture, setPicture] = React.useState('');
  const [link, setLink] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  var loadfinish = false;
  React.useEffect(() => {
    GetJournal(props.issn)
      .then((data) => {
        setIssn(data['issn']);
        setTitle(data['title']);
        setHost(data['host']);
        setPeriod(data['period']);
        setZone(data['zone']);
        setInfactor(data['inf_factor']);
        setPicture(data['picture']);
        setLink(data['link']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleJourChange = (dict) => {
    jourdict = { ...dict };
    jourUpdated = true;
  };

  const doUpdate = (e) => {
    var succeed = SetJournalInfo(jourdict);
    if (!succeed)
      setOpen(true);
    if (issn != props.issn)
      props.issn = issn;
  };

  const doDelete = (e) => {
    DeleteJournal(props.issn)
      .then(s => window.location.replace(REACT_URL + 'my/users'),
        f => setOpen(true));
  };

  var jourUpdated = false;
  var jourdict = {
    issn: issn,
    title: title,
    host: host,
    period: period,
    zone: zone,
    inf_factor: inf_factor,
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
      <JournalInfo
        onJourChange={handleJourChange}
        issn={issn}
        title={title}
        host={host}
        period={period}
        zone={zone}
        inf_factor={inf_factor}
        link={link}
        picture={picture}
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
