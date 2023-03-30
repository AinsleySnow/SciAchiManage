import * as React from "react";
import { NewspaperInfo } from "./ApplyForm";
import { AddNewspaper, DeleteNewspaper, GetNewspaper, SetNewspaperInfo } from "./Common";


export function AddNewspaperPanel() {
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

  const handleNpChange = (dict) => {
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
    AddNewspaper(npdict)
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
      <NewspaperInfo
        onNpChange={handleNpChange}
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


export function NewspaperInfoEdit(props) {
  const [issn, setIssn] = React.useState(props.id);
  const [title, setTitle] = React.useState('');
  const [authority, setAuthority] = React.useState('');
  const [host, setHost] = React.useState('');
  const [city, setCity] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [phone_num, setPhonenum] = React.useState('');
  const [link, setLink] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  var loadfinish = false;
  React.useEffect(() => {
    GetNewspaper(uid, props.issn)
      .then((data) => {
        setIssn(data['issn']);
        setTitle(data['title']);
        setAuthority(data['authority']);
        setHost(data['host']);
        setCity(data['city']);
        setAddress(data['address']);
        setPostcode(data['postcode']);
        setPhonenum(data['phone_num']);
        setLink(data['link']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleNpChange = (dict) => {
    npdict = { ...dict };
    npUpdated = true;
  };

  const doUpdate = (e) => {
    if (!loadfinish)
      return;
    if (npUpdated) {
      var succeed = SetNewspaperInfo(props.issn, npdict);
      if (!succeed)
        setOpen(true);
      if (issn != props.issn)
        props.issn = issn;
    }
  };

  const doDelete = (e) => {
    DeleteNewspaper(props.issn)
      .then(s => window.location.replace(REACT_URL + 'my/users'),
        f => setOpen(true));
  };

  var npUpdated = false;
  var npdict = {
    issn: issn,
    title: title,
    host: host,
    period: city,
    zone: address,
    inf_factor: postcode,
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
      <NewspaperInfo
        onNpChange={handleNpChange}
        issn={issn}
        title={title}
        authority={authority}
        host={host}
        city={city}
        address={address}
        postcode={postcode}
        phone_num={phone_num}
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
