import { Button, Grid } from "@mui/material";
import * as React from "react";
import { REACT_URL } from "../Constants";
import { MessageBar } from "../MessageBar";
import { PrizeInfo } from "./ApplyForm";
import { AddPrize, DeletePrize, GetPrize, SetPrizeInfo } from "./Common";


export function AddPrizePanel() {
  var id = '';
  var name = '';
  var desp = '';
  var apply_date = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePrizeChange = (dict) => {
    pdict = { ...dict };
  };

  var pdict = {
    id: id,
    name: name,
    desp: desp,
    apply_date: apply_date
  };

  const doAddition = () => {
    AddPrize(pdict);
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
      <PrizeInfo
        onPrizeChange={handlePrizeChange}
        name={name}
        desp={desp}
        apply_date={apply_date}
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


export function PrizeInfoEdit(props) {
  const [name, setName] = React.useState(props.id);
  const [desp, setDesp] = React.useState('');
  const [apply_date, setApplyDate] = React.useState('');

  React.useEffect(() => {
    GetPrize(props.id)
      .then((data) => {
        console.log(data);
        setName(data['name']);
        setDesp(data['desp']);
        setApplyDate(data['apply_date']);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePrizeChange = (dict) => {
    pdict = { ...dict };
  };

  const doUpdate = (e) => {
    var succeed = SetPrizeInfo(pdict);
    if (!succeed)
      setOpen(true);
    if (name != props.id)
      props.id = name;
  };

  const doDelete = (e) => {
    DeletePrize(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/conference/'),
        f => setOpen(true));
  };

  var pdict = {
    name: name,
    desp: desp,
    apply_date: apply_date,
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
      <PrizeInfo
        onPrizeChange={handlePrizeChange}
        name={name}
        desp={desp}
        apply_date={apply_date}
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
