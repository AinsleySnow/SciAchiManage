import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Image from 'mui-image';
import ImageWrapper from '../ImageWrapper';
import { API_URL } from '../Constants';


export function JournalInfo(props) {
  const [issn, setIssn] = React.useState(props.issn);
  const [title, setTitle] = React.useState(props.title);
  const [host, setHost] = React.useState(props.host);
  const [period, setPeriod] = React.useState(props.period);
  const [zone, setZone] = React.useState(props.zone);
  const [inf_factor, setInfactor] = React.useState(props.inf_factor);
  const [link, setLink] = React.useState(props.link);

  React.useEffect(
    () => setIssn(props.issn),
    [props.issn]
  );
  React.useEffect(
    () => setTitle(props.title),
    [props.title]
  );
  React.useEffect(
    () => setHost(props.host),
    [props.host]
  );
  React.useEffect(
    () => setPeriod(props.period),
    [props.period]
  );
  React.useEffect(
    () => setZone(props.zone),
    [props.zone]
  );
  React.useEffect(
    () => setInfactor(props.inf_factor),
    [props.inf_factor]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );


  var jurdict = {
    issn: issn,
    title: title,
    host: host,
    period: period,
    zone: zone,
    inf_factor: inf_factor,
    link: link
  };

  const handleIssnChange = (event) => {
    setIssn(event.target.value);
    jurdict.issn = event.target.value;
    props.onJourChange(jurdict);
  };

  const handleInfChange = (event) => {
    jurdict.inf_factor = event.target.value;
    setInfactor(jurdict.inf_factor);
    props.onJourChange(jurdict);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    jurdict.title = event.target.value;
    props.onJourChange(jurdict);
  };

  const handleHostChange = (event) => {
    setHost(event.target.value);
    jurdict.host = event.target.value;
    props.onJourChange(jurdict);
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    jurdict.period = event.target.value;
    props.onJourChange(jurdict);
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
    jurdict.zone = event.target.value;
    props.onJourChange(jurdict);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    jurdict.link = event.target.value;
    props.onJourChange(jurdict);
  };


  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑期刊
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <ImageWrapper height={400} src={ API_URL + '/' + props.picture + '/' } />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleIssnChange}
            required
            id="issn"
            name="issn"
            label="ISSN"
            variant="standard"
            value={jurdict.issn}
          />
          <TextField
            onChange={handleTitleChange}
            required
            id="title"
            name="title"
            label="标题"
            variant="standard"
            value={jurdict.title}
          />
          <TextField
            onChange={handleHostChange}
            required
            id="host"
            name="host"
            label="主办机构"
            variant="standard"
            value={jurdict.host}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="period-select">出版周期</InputLabel>
            <Select
              labelId="period-select"
              id="period"
              label="出版周期"
              value={jurdict.period}
              onChange={handlePeriodChange}
            >
              <MenuItem value={1}>月刊</MenuItem>
              <MenuItem value={2}>季刊</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="zone-select">分区</InputLabel>
            <Select
              labelId="zone-select"
              id="zone"
              label="分区"
              value={jurdict.zone}
              onChange={handleZoneChange}
            >
              <MenuItem value="">
                <em>未设置</em>
              </MenuItem>
              <MenuItem value={1}>一区</MenuItem>
              <MenuItem value={2}>二区</MenuItem>
              <MenuItem value={1}>三区</MenuItem>
              <MenuItem value={2}>四区</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={handleInfChange}
            required
            id="inf"
            name="inf"
            label="影响因子"
            variant="standard"
            value={jurdict.inf_factor}
          />
          <TextField
            onChange={handleLinkChange}
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
            value={jurdict.link}
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function PaperInfo() {
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑论文信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="issn"
            name="issn"
            label="期刊 ISSN"
            variant="standard"
          />
          <TextField
            required
            id="title"
            name="title"
            label="论文题目"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function NewspaperInfo() {
  const [issn, setIssn] = React.useState(props.issn);
  const [title, setTitle] = React.useState(props.title);
  const [authority, setAuthority] = React.useState(props.authority);
  const [host, setHost] = React.useState(props.host);
  const [city, setCity] = React.useState(props.city);
  const [address, setAddress] = React.useState(props.address);
  const [postcode, setPostcode] = React.useState(props.postcode);
  const [phone_num, setPhonenum] = React.useState(props.phone_num);
  const [link, setLink] = React.useState(props.link);

  React.useEffect(
    () => setIssn(props.issn),
    [props.issn]
  );
  React.useEffect(
    () => setTitle(props.title),
    [props.title]
  );
  React.useEffect(
    () => setAuthority(props.authority),
    [props.authority]
  );
  React.useEffect(
    () => setHost(props.host),
    [props.host]
  );
  React.useEffect(
    () => setCity(props.city),
    [props.city]
  );
  React.useEffect(
    () => setAddress(props.address),
    [props.address]
  );
  React.useEffect(
    () => setPostcode(props.postcode),
    [props.postcode]
  );
  React.useEffect(
    () => setPhonenum(props.phone_num),
    [props.phone_num]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );


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

  const handleIssnChange = (event) => {
    setIssn(event.target.value);
    npdict.issn = event.target.value;
    props.onNpChange(npdict);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    npdict.title = event.target.value;
    props.onNpChange(npdict);
  };

  const handleAuthorityChange = (event) => {
    setAuthority(event.target.value);
    npdict.title = event.target.value;
    props.onNpChange(npdict);
  };

  const handleHostChange = (event) => {
    setHost(event.target.value);
    npdict.host = event.target.value;
    props.onNpChange(npdict);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    npdict.city = event.target.value;
    props.onNpChange(npdict);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    npdict.address = event.target.value;
    props.onNpChange(npdict);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
    npdict.address = event.target.value;
    props.onNpChange(npdict);
  };

  const handlePhoneNumChange = (event) => {
    setPhonenum(event.target.value);
    npdict.address = event.target.value;
    props.onNpChange(npdict);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    npdict.link = event.target.value;
    props.onNpChange(npdict);
  };


  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑报纸
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <ImageWrapper height={400} src={API_URL + '/' + props.picture + '/'} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleIssnChange}
            required
            id="issn"
            name="issn"
            label="ISSN"
            variant="standard"
          />
          <TextField
            onChange={handleTitleChange}
            required
            id="title"
            name="title"
            label="标题"
            variant="standard"
          />
          <TextField
            onChange={handleAuthorityChange}
            required
            id="authority"
            name="authority"
            label="主管机构"
            variant="standard"
          />
          <TextField
            onChange={handleHostChange}
            required
            id="host"
            name="host"
            label="主办机构"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleCityChange}
            required
            id="city"
            name="city"
            label="出版地"
            variant="standard"
          />
          <TextField
            onChange={handleAddressChange}
            required
            id="address"
            name="address"
            label="联系地址"
            variant="standard"
          />
          <TextField
            onChange={handlePostcodeChange}
            required
            id="postcode"
            name="postcode"
            label="邮编"
            variant="standard"
          />
          <TextField
            onChange={handlePhoneNumChange}
            required
            id="phone_num"
            name="phone_num"
            label="电话"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function ArticleInfo() {
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑报刊文章信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="issn"
            name="issn"
            label="报纸 ISSN"
            variant="standard"
          />
          <TextField
            required
            id="title"
            name="title"
            label="文章题目"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function ConferenceInfo() {
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [time, setTime] = React.useState(props.time);
  const [place, setPlace] = React.useState(props.place);
  const [association, setAssociation] = React.useState(props.association);
  const [publisher, setPublisher] = React.useState(props.publisher);
  const [publish_date, setPublishDate] = React.useState(props.publish_date);
  const [chief_editor, setChiefEditor] = React.useState(props.chief_editor);
  const [editors, setEditors] = React.useState(props.editors);
  const [link, setLink] = React.useState(props.link);

  React.useEffect(
    () => setId(props.id),
    [props.id]
  );
  React.useEffect(
    () => setName(props.name),
    [props.name]
  );
  React.useEffect(
    () => setTime(props.time),
    [props.time]
  );
  React.useEffect(
    () => setPlace(props.place),
    [props.place]
  );
  React.useEffect(
    () => setAssociation(props.association),
    [props.association]
  );
  React.useEffect(
    () => setPublisher(props.publisher),
    [props.publisher]
  );
  React.useEffect(
    () => setPublishDate(props.publish_date),
    [props.publish_date]
  );
  React.useEffect(
    () => setChiefEditor(props.chief_editor),
    [props.chief_editor]
  );
  React.useEffect(
    () => setEditors(props.editors),
    [props.editors]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );


  var confdict = {
    id: id,
    name: name,
    place: time,
    place: place,
    association: association,
    publisher: publisher,
    publish_date: publish_date,
    chief_editor: chief_editor,
    editors: editors,
    link: link
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
    confdict.id = event.target.value;
    props.onConfChange(confdict);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    confdict.name = event.target.value;
    props.onConfChange(confdict);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
    confdict.time = event.target.value;
    props.onConfChange(confdict);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
    confdict.place = event.target.value;
    props.onConfChange(confdict);
  };

  const handleAssociationChange = (event) => {
    setAssociation(event.target.value);
    confdict.association = event.target.value;
    props.onConfChange(confdict);
  };

  const handlePublisherChange = (event) => {
    setPublisher(event.target.value);
    confdict.publisher = event.target.value;
    props.onConfChange(confdict);
  };

  const handlePDChange = (event) => {
    setPublishDate(event.target.value);
    confdict.publish_date = event.target.value;
    props.onConfChange(confdict);
  };

  const handleChiefEditorChange = (event) => {
    setChiefEditor(event.target.value);
    confdict.chief_editor = event.target.value;
    props.onConfChange(confdict);
  };

  const handleEditorsChange = (event) => {
    setEditors(event.target.value);
    confdict.editors = event.target.value;
    props.onConfChange(confdict);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    confdict.link = event.target.value;
    props.onConfChange(confdict);
  };


  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑会议信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleNameChange}
            required
            id="name"
            name="name"
            label="会议名"
            variant="standard"
          />
          <TextField
            onChange={handleTimeChange}
            required
            id="time"
            name="time"
            label="会议时间"
            variant="standard"
          />
          <TextField
            onChange={handlePlaceChange}
            required
            id="place"
            name="place"
            label="会议地点"
            variant="standard"
          />
          <TextField
            onChange={handleAssociationChange}
            required
            id="association"
            name="association"
            label="主办协会"
            variant="standard"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            onChange={handlePublisherChange}
            required
            id="publisher"
            name="publisher"
            label="出版社"
            variant="standard"
          />
          <TextField
            onChange={handlePDChange}
            required
            id="publish-date"
            name="publish-date"
            label="出版时间"
            variant="standard"
          />
          <TextField
            onChange={handleChiefEditorChange}
            required
            id="chief-editor"
            name="chief-editor"
            label="主编"
            variant="standard"
          />
          <TextField
            onChange={handleEditorsChange}
            required
            id="editor"
            name="editor"
            label="编者"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function BookInfo() {
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑出版物
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <Image height={200} src='https://source.unsplash.com/random' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="isbn"
            name="isbn"
            label="ISBN"
            variant="standard"
          />
          <TextField
            required
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            required
            id="publisher"
            name="publisher"
            label="出版社"
            variant="standard"
          />
          <TextField
            required
            id="publish-year"
            name="publish-year"
            label="出版年"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="place-published"
            name="place-published"
            label="出版地"
            variant="standard"
          />
          <TextField
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function PatentInfo() {
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑专利信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <Image height={200} src='https://source.unsplash.com/random' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="patent-num"
            name="patent-num"
            label="专利号"
            variant="standard"
          />
          <TextField
            required
            id="promulgate-num"
            name="promulgate-num"
            label="公布号"
            variant="standard"
          />
          <TextField
            required
            id="name"
            name="name"
            label="专利名"
            variant="standard"
          />
          <TextField
            required
            id="applyer"
            name="applyer"
            label="申请者"
            variant="standard"
          />
          <TextField
            required
            id="inventor"
            name="inventor"
            label="发明人"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="inventor"
            name="inventor"
            label="发明人"
            variant="standard"
          />
          <TextField
            required
            id="issue"
            name="issue"
            label="专辑"
            variant="standard"
          />
          <TextField
            required
            id="theme"
            name="theme"
            label="专题"
            variant="standard"
          />
          <TextField
            required
            id="cata"
            name="cata"
            label="分类号"
            variant="standard"
          />
          <TextField
            required
            id="major-cata"
            name="major-cata"
            label="主分类号"
            variant="standard"
          />
          <TextField
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}
