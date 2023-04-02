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

  console.log(props.picture);

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
          <ImageWrapper height={400} src={API_URL + '/' + props.picture} />
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
              <MenuItem value={3}>三区</MenuItem>
              <MenuItem value={4}>四区</MenuItem>
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

export function PaperInfo(props) {
  const [id, setId] = React.useState('');
  const [issn, setIssn] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [link, setLink] = React.useState('');
  const [publish_date, setPublishDate] = React.useState('');
  const [page, setPage] = React.useState('');
  const [volume, setVolume] = React.useState('');
  const [number, setNumber] = React.useState('');

  React.useEffect(
    () => setId(props.id),
    [props.id]
  );
  React.useEffect(
    () => setIssn(props.issn),
    [props.issn]
  );
  React.useEffect(
    () => setTitle(props.title),
    [props.title]
  );
  React.useEffect(
    () => setAuthor(props.author),
    [props.author]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );
  React.useEffect(
    () => setPublishDate(props.publish_date),
    [props.publish_date]
  );
  React.useEffect(
    () => setPage(props.page),
    [props.page]
  );
  React.useEffect(
    () => setVolume(props.volume),
    [props.volume]
  );
  React.useEffect(
    () => setNumber(props.number),
    [props.number]
  );

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

  const handleIdChange = (event) => {
    setId(event.target.value);
    pdict.id = event.target.value;
    props.onPaperChange(pdict);
  }

  const handleIssnChange = (event) => {
    setIssn(event.target.value);
    pdict.issn = event.target.value;
    props.onPaperChange(pdict);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    pdict.title = event.target.value;
    props.onPaperChange(pdict);
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    pdict.author = event.target.value;
    props.onPaperChange(pdict);
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    pdict.link = event.target.value;
    props.onPaperChange(pdict);
  }

  const handlePublishDateChange = (event) => {
    setPublishDate(event.target.value);
    pdict.publish_date = event.target.value;
    props.onPaperChange(pdict);
  }

  const handlePageChange = (event) => {
    setPage(event.target.value);
    pdict.page = event.target.value;
    props.onPaperChange(pdict);
  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    pdict.volume = event.target.value;
    props.onPaperChange(pdict);
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
    pdict.number = event.target.value;
    props.onPaperChange(pdict);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑论文信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleIssnChange}
            value={issn}
            required
            id="issn"
            name="issn"
            label="期刊 ISSN"
            variant="standard"
          />
          <TextField
            onChange={handleTitleChange}
            value={title}
            required
            id="title"
            name="title"
            label="论文题目"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleAuthorChange}
            value={author}
            required
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            onChange={handlePublishDateChange}
            value={publish_date}
            required
            id="publish_date"
            name="publish_date"
            label="出版日期"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            value={link}
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handlePageChange}
            value={page}
            required
            id="page"
            name="page"
            label="页码"
            variant="standard"
          />
          <TextField
            onChange={handleVolumeChange}
            value={volume}
            required
            id="volume"
            name="volume"
            label="卷号"
            variant="standard"
          />
          <TextField
            onChange={handleNumberChange}
            value={number}
            required
            id="number"
            name="number"
            label="期号"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function NewspaperInfo(props) {
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
          <ImageWrapper height={400} src={API_URL + '/' + props.picture} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleIssnChange}
            value={issn}
            required
            id="issn"
            name="issn"
            label="ISSN"
            variant="standard"
          />
          <TextField
            onChange={handleTitleChange}
            value={title}
            required
            id="title"
            name="title"
            label="标题"
            variant="standard"
          />
          <TextField
            onChange={handleAuthorityChange}
            value={authority}
            required
            id="authority"
            name="authority"
            label="主管机构"
            variant="standard"
          />
          <TextField
            onChange={handleHostChange}
            value={host}
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
            value={city}
            required
            id="city"
            name="city"
            label="出版地"
            variant="standard"
          />
          <TextField
            onChange={handleAddressChange}
            value={address}
            required
            id="address"
            name="address"
            label="联系地址"
            variant="standard"
          />
          <TextField
            onChange={handlePostcodeChange}
            value={postcode}
            required
            id="postcode"
            name="postcode"
            label="邮编"
            variant="standard"
          />
          <TextField
            onChange={handlePhoneNumChange}
            value={phone_num}
            required
            id="phone_num"
            name="phone_num"
            label="电话"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            value={link}
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

export function ArticleInfo(props) {
  const [id, setId] = React.useState(props.id);
  const [issn, setIssn] = React.useState(props.issn);
  const [title, setTitle] = React.useState(props.title);
  const [author, setAuthor] = React.useState(props.author);
  const [version, setVersion] = React.useState(props.version);
  const [publish_date, setPublishDate] = React.useState(props.publish_date);
  const [link, setLink] = React.useState(props.link);

  React.useEffect(
    () => setId(props.id),
    [props.id]
  );
  React.useEffect(
    () => setIssn(props.issn),
    [props.issn]
  );
  React.useEffect(
    () => setTitle(props.title),
    [props.title]
  );
  React.useEffect(
    () => setAuthor(props.author),
    [props.author]
  );
  React.useEffect(
    () => setVersion(props.version),
    [props.version]
  );
  React.useEffect(
    () => setPublishDate(props.publish_date),
    [props.publish_date]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );


  var adict = {
    id: id,
    issn: issn,
    title: title,
    author: author,
    version: version,
    publish_date: publish_date,
    link: link
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
    adict.id = event.target.value;
    props.onArticleChange(adict);
  };

  const handleIssnChange = (event) => {
    setIssn(event.target.value);
    adict.issn = event.target.value;
    props.onArticleChange(adict);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    adict.title = event.target.value;
    props.onArticleChange(adict);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    adict.author = event.target.value;
    props.onArticleChange(adict);
  };

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
    adict.version = event.target.value;
    props.onArticleChange(adict);
  };

  const handlePDChange = (event) => {
    setPublishDate(event.target.value);
    adict.publish_date = event.target.value;
    props.onArticleChange(adict);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    adict.link = event.target.value;
    props.onConfChange(adict);
  };


  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑报刊文章信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleIssnChange}
            required
            value={issn}
            id="issn"
            name="issn"
            label="报纸 ISSN"
            variant="standard"
          />
          <TextField
            onChange={handleTitleChange}
            required
            value={title}
            id="title"
            name="title"
            label="文章题目"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleAuthorChange}
            required
            value={author}
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            onChange={handleVersionChange}
            required
            value={version}
            id="version"
            name="version"
            label="版数"
            variant="standard"
          />
          <TextField
            onChange={handlePDChange}
            required
            value={publish_date}
            id="publish-date"
            name="publish-date"
            label="日期"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            required
            value={link}
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

export function ConferenceInfo(props) {
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
    time: time,
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
            value={name}
            required
            id="name"
            name="name"
            label="会议名"
            variant="standard"
          />
          <TextField
            onChange={handleTimeChange}
            value={time}
            required
            id="time"
            name="time"
            label="会议时间"
            variant="standard"
          />
          <TextField
            onChange={handlePlaceChange}
            value={place}
            required
            id="place"
            name="place"
            label="会议地点"
            variant="standard"
          />
          <TextField
            onChange={handleAssociationChange}
            value={association}
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
            value={publisher}
            required
            id="publisher"
            name="publisher"
            label="出版社"
            variant="standard"
          />
          <TextField
            onChange={handlePDChange}
            value={publish_date}
            required
            id="publish-date"
            name="publish-date"
            label="出版时间"
            variant="standard"
          />
          <TextField
            onChange={handleChiefEditorChange}
            value={chief_editor}
            required
            id="chief-editor"
            name="chief-editor"
            label="主编"
            variant="standard"
          />
          <TextField
            onChange={handleEditorsChange}
            value={editors}
            required
            id="editor"
            name="editor"
            label="编者"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            value={link}
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

export function ConfpaperInfo(props) {
  const [id, setId] = React.useState('');
  const [cid, setCid] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [link, setLink] = React.useState('');
  const [publish_date, setPublishDate] = React.useState('');
  const [page, setPage] = React.useState('');

  React.useEffect(
    () => setId(props.id),
    [props.id]
  );
  React.useEffect(
    () => setCid(props.cid),
    [props.cid]
  );
  React.useEffect(
    () => setTitle(props.title),
    [props.title]
  );
  React.useEffect(
    () => setAuthor(props.author),
    [props.author]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );
  React.useEffect(
    () => setPublishDate(props.publish_date),
    [props.publish_date]
  );
  React.useEffect(
    () => setPage(props.page),
    [props.page]
  );

  var cpdict = {
    id: id,
    cid: cid,
    title: title,
    author: author,
    page: page,
    publish_date: publish_date,
    link: link
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
    cpdict.id = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  const handleCidChange = (event) => {
    setCid(event.target.value);
    cpdict.cid = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    cpdict.title = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    cpdict.author = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    cpdict.link = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  const handlePublishDateChange = (event) => {
    setPublishDate(event.target.value);
    cpdict.publish_date = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  const handlePageChange = (event) => {
    setPage(event.target.value);
    cpdict.page = event.target.value;
    props.onConfpaperChange(cpdict);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑会议论文信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleCidChange}
            value={cid}
            required
            id="cid"
            name="cid"
            label="会议编号"
            variant="standard"
          />
          <TextField
            onChange={handleTitleChange}
            value={title}
            required
            id="title"
            name="title"
            label="论文题目"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleAuthorChange}
            value={author}
            required
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            onChange={handlePublishDateChange}
            value={publish_date}
            required
            id="publish_date"
            name="publish_date"
            label="出版日期"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            value={link}
            required
            id="link"
            name="link"
            label="链接"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handlePageChange}
            value={page}
            required
            id="page"
            name="page"
            label="页码"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

export function BookInfo(props) {
  const [isbn, setIsbn] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [publish_year, setPublishYear] = React.useState('');
  const [place_published, setPlacePublished] = React.useState('');
  const [picture, setPicture] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(
    () => setIsbn(props.isbn),
    [props.isbn]
  );
  React.useEffect(
    () => setTitle(props.title),
    [props.title]
  );
  React.useEffect(
    () => setAuthor(props.author),
    [props.author]
  );
  React.useEffect(
    () => setPublisher(props.publisher),
    [props.publisher]
  );
  React.useEffect(
    () => setPublishYear(props.publish_year),
    [props.publish_year]
  );
  React.useEffect(
    () => setPlacePublished(props.place_published),
    [props.place_published]
  );
  React.useEffect(
    () => setPicture(props.picture),
    [props.picture]
  );
  React.useEffect(
    () => setLink(props.link),
    [props.link]
  );

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

  const handleIsbnChange = (event) => {
    setIsbn(event.target.value);
    bdict.isbn = event.target.value;
    props.onBookChange(bdict);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    bdict.title = event.target.value;
    props.onBookChange(bdict);
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    bdict.author = event.target.value;
    props.onBookChange(bdict);
  }

  const handlePublisherChange = (event) => {
    setPublisher(event.target.value);
    bdict.publish_year = event.target.value;
    props.onBookChange(bdict);
  }

  const handlePlacePublishedChange = (event) => {
    setPlacePublished(event.target.value);
    bdict.place_published = event.target.value;
    props.onBookChange(bdict);
  }

  const handlePictureChange = (event) => {
    setPicture(event.target.value);
    bdict.picture = event.target.value;
    props.onBookChange(bdict);
  }

  const handlePublishYearChange = (event) => {
    setPublishYear(event.target.value);
    bdict.publish_year = event.target.value;
    props.onBookChange(bdict);
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    bdict.link = event.target.value;
    props.onBookChange(bdict);
  }


  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑出版物
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <ImageWrapper height={200} src='' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handleIsbnChange}
            value={isbn}
            required
            id="isbn"
            name="isbn"
            label="ISBN"
            variant="standard"
          />
          <TextField
            onChange={handleAuthorChange}
            value={author}
            required
            id="author"
            name="author"
            label="作者"
            variant="standard"
          />
          <TextField
            onChange={handlePublisherChange}
            value={publisher}
            required
            id="publisher"
            name="publisher"
            label="出版社"
            variant="standard"
          />
          <TextField
            onChange={handlePublishYearChange}
            value={publish_year}
            required
            id="publish-year"
            name="publish-year"
            label="出版年"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            onChange={handlePlacePublishedChange}
            value={place_published}
            required
            id="place-published"
            name="place-published"
            label="出版地"
            variant="standard"
          />
          <TextField
            onChange={handleLinkChange}
            value={link}
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
