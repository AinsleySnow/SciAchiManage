import { Button, Grid } from "@mui/material";
import * as React from "react";
import { REACT_URL } from "../Constants";
import { MessageBar } from "../MessageBar";
import { PatentInfo } from "./ApplyForm";
import { AddPatent, DeletePatent, GetPatent, SetPatentInfo } from "./Common";


export function AddPatentPanel() {
  var patent_num = '';
  var promulgate_num = '';
  var name = '';
  var applyer = '';
  var inventor = '';
  var issue = '';
  var theme = '';
  var catagory_num = '';
  var major_catagory = '';
  var link = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePatentChange = (dict) => {
    pdict = { ...dict };
  };

  var pdict = {
    patent_num: patent_num,
    promulgate_num: promulgate_num,
    name: name,
    applyer: applyer,
    inventor: inventor,
    issue: issue,
    theme: theme,
    catagory_num: catagory_num,
    major_catagory: major_catagory,
    link: link
  };

  const doAddition = () => {
    AddPatent(pdict);
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
      <PatentInfo
        onPatentChange={handlePatentChange}
        patent_num={patent_num}
        promulgate_num={promulgate_num}
        name={name}
        applyer={applyer}
        inventor={inventor}
        issue={issue}
        theme={theme}
        catagory_num={catagory_num}
        major_catagory={major_catagory}
        link={catagory_num}
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


export function PatentInfoEdit(props) {
  const [patent_num, setPatentNum] = React.useState(props.isbn);
  const [promulgate_num, setPromulgateNum] = React.useState('');
  const [name, setName] = React.useState('');
  const [applyer, setApplyer] = React.useState('');
  const [inventor, setInventor] = React.useState('');
  const [issue, setIssue] = React.useState('');
  const [theme, setTheme] = React.useState('');
  const [catagory_num, setCatagoryNum] = React.useState('');
  const [major_catagory, setMajorCatagory] = React.useState('');
  const [link, setLink] = React.useState('');

  var loadfinish = false;
  React.useEffect(() => {
    GetPatent(props.patent_num)
      .then((data) => {
        setPatentNum(data['patent_num']);
        setPromulgateNum(data['promulgate_num']);
        setName(data['name']);
        setApplyer(data['applyer']);
        setInventor(data['inventor']);
        setIssue(data['issue']);
        setTheme(data['theme']);
        setCatagoryNum(data['catagory_num']);
        setMajorCatagory(data['major_catagory']);
        setLink(data['link']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePatentChange = (dict) => {
    pdict = { ...dict };
    bUpdated = true;
  };

  const doUpdate = (e) => {
    var succeed = SetPatentInfo(pdict);
    if (!succeed)
      setOpen(true);
    if (patent_num != props.patent_num)
      props.patent_num = patent_num;
  };

  const doDelete = (e) => {
    DeletePatent(props.patent_num)
      .then(s => window.location.replace(REACT_URL + 'my/achi'),
        f => setOpen(true));
  };

  var bUpdated = false;
  var pdict = {
    patent_num: patent_num,
    promulgate_num: promulgate_num,
    name: name,
    applyer: applyer,
    inventor: inventor,
    issue: issue,
    theme: theme,
    catagory_num: catagory_num,
    major_catagory: major_catagory,
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
      <PatentInfo
        onPatentChange={handlePatentChange}
        patent_num={patent_num}
        promulgate_num={promulgate_num}
        name={name}
        applyer={applyer}
        inventor={inventor}
        issue={issue}
        theme={theme}
        catagory_num={catagory_num}
        major_catagory={major_catagory}
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
