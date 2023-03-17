import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Image from 'mui-image';

export function JournalInfo() {
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑期刊信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <Image height={200} src='https://source.unsplash.com/random' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="issn"
            name="issn"
            label="ISSN"
            variant="standard"
          />
          <TextField
            required
            id="title"
            name="title"
            label="标题"
            variant="standard"
          />
          <TextField
            required
            id="host"
            name="host"
            label="主办机构"
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="period-select">出版周期</InputLabel>
            <Select
              labelId="period-select"
              id="period"
              label="出版周期"
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
            required
            id="inf"
            name="inf"
            label="影响因子"
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
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑报纸信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <Image height={200} src='https://source.unsplash.com/random' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="issn"
            name="issn"
            label="ISSN"
            variant="standard"
          />
          <TextField
            required
            id="title"
            name="title"
            label="标题"
            variant="standard"
          />
          <TextField
            required
            id="authority"
            name="authority"
            label="主管机构"
            variant="standard"
          />
          <TextField
            required
            id="host"
            name="host"
            label="主办机构"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="city"
            name="city"
            label="出版地"
            variant="standard"
          />
          <TextField
            required
            id="address"
            name="address"
            label="联系地址"
            variant="standard"
          />
          <TextField
            required
            id="postcode"
            name="postcode"
            label="邮编"
            variant="standard"
          />
          <TextField
            required
            id="phone_num"
            name="phone_num"
            label="电话"
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
  return (
    <React.Fragment>
      <Typography variant="h6" paddingBottom={4}>
        添加/编辑会议信息
      </Typography>
      <Grid container flexShrink={'row'} spacing={3}>
        <Grid item xs={12} sm={5}>
          <Image height={200} src='https://source.unsplash.com/random' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="name"
            name="name"
            label="会议名"
            variant="standard"
          />
          <TextField
            required
            id="time"
            name="time"
            label="会议时间"
            variant="standard"
          />
          <TextField
            required
            id="place"
            name="place"
            label="会议地点"
            variant="standard"
          />
          <TextField
            required
            id="association"
            name="association"
            label="主办协会"
            variant="standard"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            required
            id="publisher"
            name="publisher"
            label="出版社"
            variant="standard"
          />
          <TextField
            required
            id="publish-date"
            name="publish-date"
            label="出版时间"
            variant="standard"
          />
          <TextField
            required
            id="chief-editor"
            name="chief-editor"
            label="主编"
            variant="standard"
          />
          <TextField
            required
            id="editor"
            name="editor"
            label="编者"
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
