import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import { REACT_URL } from '../Constants';
import { AddApply, AddPaper, GetApply } from './Common';
import { Stack, Tab, Tabs } from '@mui/material';
import { AddJournalPanel, JournalInfoEdit } from './JournalPanel';
import { AddNewspaperPanel, NewspaperInfoEdit } from './NewspaperPanel';
import { AddConfPanel, ConfInfoEdit } from './ConfPanel';
import { AddPaperPanel, PaperInfoEdit } from './PaperPanel';
import { AddConfpaperPanel, ConfpaperInfoEdit } from './ConfpaperPanel';
import { AddArticlePanel, ArticleInfoEdit } from './ArticlePanel';
import { AddBookPanel, BookInfoEdit } from './BookPanel';
import { AddPatentPanel, PatentInfoEdit } from './PatentPanel';


import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Routes, Route, Link, useParams } from 'react-router-dom'

import { API_URL } from '../Constants';
import { GetPaper, GetUser } from './Common';
import { GetResearcher } from './Common';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import InfoTable from './InfoTable';
import ResearcherInfo from './ResearcherInfo';
import { ArticleInfo, BookInfo, ConfpaperInfo, JournalInfo, PaperInfo, PatentInfo, PrizeInfo } from './ApplyForm';
import { StatPanel } from './StatPanel';
import { PrizeInfoEdit } from './PrizePanel';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const resListItems = (
  <React.Fragment>
    <ListItemButton href='/my/achi'>
      <ListItemIcon>
        <EmojiEventsRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="我的成果" />
    </ListItemButton>
    <ListItemButton href='/my/apply'>
      <ListItemIcon>
        <ApprovalRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="申请信息" />
    </ListItemButton>
    <ListItemButton href='/my/settings'>
      <ListItemIcon>
        <SettingsRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="修改个人信息" />
    </ListItemButton>
    <ListItemButton href='/my/stat'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="成果统计" />
    </ListItemButton>
  </React.Fragment>
);

const mdTheme = createTheme();

function SettingPanel() {
  const [rname, SetRname] = React.useState('');
  const [passwd, setPassws] = React.useState('');
  const [sex, SetSex] = React.useState('');
  const [dept, SetDept] = React.useState('');

  const [position, SetPosition] = React.useState('');
  const [profile, SetProfile] = React.useState('');
  const [work, SetWork] = React.useState('');
  const [pic, SetPic] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  React.useEffect(() => {
    GetUser(uid, uid)
      .then((data) => {
        SetRname(data['name']);
        setPassws(data['passwd']);
        SetSex(data['sex']);
        SetDept(data['dept']);
      });

    GetResearcher(uid)
      .then((data) => {
        SetPic(API_URL + data['pic']);
        SetPosition(data['position']);
        SetProfile(data['profile']);
        SetWork(data['works']);
      });
  }, []);


  var newpasswd = '';

  var resdict = {
    pic: pic,
    position: position,
    profile: profile,
    works: work
  };

  const handlePasswdChange = (dict) => {
    newpasswd = dict['passwd'];
  };

  const handleResChange = (dict) => {
    resdict = { ...dict };
  };


  return (
    <ResearcherInfo
      onUsrChange={handlePasswdChange}
      onResChange={handleResChange}
      allowbasic={false}
      title={'基本信息'}
      id={uid}
      rname={rname}
      passwd={passwd}
      position={position}
      dept={dept}
      sex={sex}
      profile={profile}
      works={work}
      pic={pic}
    />
  );
}


var pagesize = 100;
var paper_page = 1;
var confpaper_page = 1;
var article_page = 1;
var book_page = 1;
var patent_page = 1;
var prize_page = 1;

function AchiPanel() {
  const [value, setValue] = React.useState(0);

  const [page, setPage] = React.useState(1);
  let uid = window.sessionStorage.getItem('id');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (value === 0)
      setPage(paper_page);
    else if (value === 1)
      setPage(confpaper_page);
    else if (value === 2)
      setPage(article_page);
    else if (value === 3)
      setPage(book_page);
    else if (value === 4)
      setPage(patent_page);
    else if (value === 5)
      setPage(prize_page);
  };

  const toNextPage = () => {
    next_page();
    let from = (current_page() - 1) * pagesize;
    let to = current_page() * pagesize;
    if (value === 0) {
      GetApply('paper', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPaper(data);
        }
        );
    }
    else if (value === 1) {
      GetApply('confpaper', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setConfPaper(data);
        }
        );
    }
    else if (value === 2) {
      GetApply('article', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setArticle(data);
        }
        );
    }
    else if (value === 3) {
      GetApply('book', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setBook(data);
        }
        );
    }
    else if (value === 4) {
      GetApply('patent', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPatent(data);
        }
        );
    }
    else if (value === 5) {
      GetApply('prize', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPrize(data);
        }
        );
    }
  };

  const toPrevPage = () => {
    prev_page();
    let from = (current_page() - 1) * pagesize;
    let to = current_page() * pagesize;

    if (value === 0) {
      GetApply('paper', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPaper(data);
        }
        );
    }
    else if (value === 1) {
      GetApply('confpaper', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setConfPaper(data);
        }
        );
    }
    else if (value === 2) {
      GetApply('article', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setArticle(data);
        }
        );
    }
    else if (value === 3) {
      GetApply('book', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setBook(data);
        }
        );
    }
    else if (value === 4) {
      GetApply('patent', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPatent(data);
        }
        );
    }
    else if (value === 5) {
      GetApply('prize', uid, from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPrize(data);
        }
        );
    }
  };

  const from = () => {
    if (value === 0) {
      return (paper_page - 1) * pagesize;
    } else if (value === 1) {
      return (confpaper_page - 1) * pagesize;
    } else if (value === 2) {
      return (article_page - 1) * pagesize;
    } else if (value === 3) {
      return (book_page - 1) * pagesize;
    } else if (value === 4) {
      return (patent_page - 1) * pagesize;
    }
  };

  const to = () => {
    if (value === 0) {
      return paper_page * pagesize;
    } else if (value === 1) {
      return confpaper_page * pagesize;
    } else if (value === 2) {
      return article_page * pagesize;
    } else if (value === 3) {
      return book_page * pagesize;
    } else if (value === 4) {
      return patent_page * pagesize;
    }
  };

  const current_page = () => {
    if (value === 0) {
      return paper_page;
    } else if (value === 1) {
      return confpaper_page;
    } else if (value === 2) {
      return article_page;
    } else if (value === 3) {
      return book_page;
    } else if (value === 4) {
      return patent_page;
    }
  };

  const next_page = () => {
    if (value === 0) {
      paper_page += 1;
      setPage(paper_page);
    } else if (value === 1) {
      confpaper_page += 1;
      setPage(confpaper_page);
    } else if (value === 2) {
      article_page += 1;
      setPage(article_page);
    } else if (value === 3) {
      book_page += 1;
      setPage(book_page);
    } else if (value === 4) {
      patent_page += 1;
      setPage(patent_page);
    }
  };

  const prev_page = () => {
    if (value === 0) {
      paper_page -= 1;
      setPage(paper_page);
    } else if (value === 1) {
      confpaper_page -= 1;
      setPage(confpaper_page);
    } else if (value === 2) {
      article_page -= 1;
      setPage(article_page);
    } else if (value === 3) {
      book_page -= 1;
      setPage(book_page);
    } else if (value === 4) {
      patent_page -= 1;
      setPage(patent_page);
    }
  };

  const [paper, setPaper] = React.useState(null);
  React.useEffect(() => {
    GetApply('paper', uid, from(), to())
      .then((data) => {
        setPaper(data);
      });
  }, []);

  const [confpaper, setConfPaper] = React.useState(null);
  React.useEffect(() => {
    GetApply('confpaper', uid, from(), to())
      .then((data) => {
        setConfPaper(data);
      });
  }, []);

  const [article, setArticle] = React.useState(null);
  React.useEffect(() => {
    GetApply('article', uid, from(), to())
      .then((data) => {
        setArticle(data);
      });
  }, []);

  const [book, setBook] = React.useState(null);
  React.useEffect(() => {
    GetApply('book', uid, from(), to())
      .then((data) => {
        setBook(data);
      });
  }, []);

  const [patent, setPatent] = React.useState(null);
  React.useEffect(() => {
    GetApply('patent', uid, from(), to())
      .then((data) => {
        setPatent(data);
      });
  }, []);

  const [prize, setPrize] = React.useState(null);
  React.useEffect(() => {
    GetApply('prize', uid, from(), to())
      .then((data) => {
        setPrize(data);
      });
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange} aria-label="tab control">
          <Tab label="期刊论文" />
          <Tab label="会议论文" />
          <Tab label="报刊文章" />
          <Tab label="获奖" />
          <Tab label="著作" />
          <Tab label="专利" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {
          value === 0 &&
          <Box>
            <InfoTable
              title='成果列表'
              heads={['论文编号', '状态', '操作']}
              rows={
                paper && paper.map((row) => (
                  {
                    pid: row.pid,
                    status: row.status,
                    action:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link
                          component={'button'}
                          onClick={(e) => window.location.assign(REACT_URL + '/my/paper/' + row.pid)}
                        >
                          查看
                        </Link>
                        {' '}
                      </Typography>
                  }
                ))
              } />
          </Box>
        }
        {
          value === 1 &&
          <Box>
            <InfoTable
              title='成果列表'
              heads={['会议论文编号', '状态', '操作']}
              rows={
                confpaper && confpaper.map((row) => (
                  {
                    cpid: row.cpid,
                    status: row.status,
                    action:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link
                          component={'button'}
                          onClick={(e) => window.location.assign(REACT_URL + '/my/confpaper/' + row.cpid)}
                        >
                          查看
                        </Link>
                        {' '}
                      </Typography>
                  }
                ))
              }
            />
          </Box>
        }
        {
          value === 2 &&
          <Box>
            <InfoTable
              title='成果列表'
              heads={['报刊文章编号', '状态', '操作']}
              rows={
                article && article.map((row) => (
                  {
                    aid: row.aid,
                    status: row.status,
                    action:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link
                          component={'button'}
                          onClick={(e) => window.location.assign(REACT_URL + '/my/article/' + row.aid)}
                        >
                          查看
                        </Link>
                        {' '}
                      </Typography>
                  }
                ))
              }
            />
          </Box>
        }
        {
          value === 3 &&
          <Box>
            <InfoTable
              title='成果列表'
              heads={['书号', '状态', '操作']}
              rows={
                book && book.map((row) => (
                  {
                    isbn: row.isbn,
                    status: row.status,
                    action:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link
                          component={'button'}
                          onClick={(e) => window.location.assign(REACT_URL + '/my/book/' + row.isbn)}
                        >
                          查看
                        </Link>
                        {' '}
                      </Typography>
                  }
                ))
              }
            />
          </Box>
        }
        {
          value === 4 &&
          <Box>
            <InfoTable
              title='成果列表'
              heads={['专利号', '状态', '操作']}
              rows={
                patent && patent.map((row) => (
                  {
                    patent_num: row.patent_num,
                    status: row.status,
                    action:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link
                          component={'button'}
                          onClick={(e) => window.location.assign(REACT_URL + '/my/patent/' + row.patent_num)}
                        >
                          查看
                        </Link>
                        {' '}
                      </Typography>
                  }
                ))
              }
            />
          </Box>
        }
        {
          value === 5 &&
          <Box>
            <InfoTable
              title='获奖列表'
              heads={['获奖编号', '状态', '操作']}
              rows={
                patent && patent.map((row) => (
                  {
                    id: row.id,
                    status: row.status,
                    action:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link
                          component={'button'}
                          onClick={(e) => window.location.assign(REACT_URL + '/my/prize/' + row.patent_num)}
                        >
                          查看
                        </Link>
                        {' '}
                      </Typography>
                  }
                ))
              }
            />
          </Box>
        }
      </Grid>
      <Stack direction='row' sx={{ marginTop: 3, paddingLeft: 5 }} spacing={3}>
        <Button
          variant='contained'
          disabled={page === 1}
          onClick={(e) => toPrevPage()}>
          上一页
        </Button>
        <Typography sx={{ paddingTop: 0.5 }}>{`第${page}页`}</Typography>
        <Button
          variant='contained'
          onClick={(e) => toNextPage()}>
          下一页
        </Button>
      </Stack>
    </Grid>
  );
}


function ResearcherPanelContent() {
  let data = null;

  const [type, setType] = React.useState(0);

  const handleTypeChange = (e) => setType(e.target.value);
  const handleSubmit = (e) => {
    switch (type) {
      case 1: AddApply(data, 'paper'); break;
      case 2: AddApply(data, 'confpaper'); break;
      case 3: AddApply(data, 'prize'); break;
      case 4: AddApply(data, 'article'); break;
      case 5: AddApply(data, 'book'); break;
      case 6: AddApply(data, 'patent'); break;
    }
  };

  const handleChange = (d) => {
    data = { ...d };
  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerwidth='240' />
        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
          </Toolbar>
          <Divider />
          <List component="nav">
            {resListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Routes>
                <Route path='/'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2 }}>
                        <AchiPanel />
                      </Paper>
                    </Grid>
                  } />
                <Route path='/achi'
                  element={
                    <Grid item xs={12}>
                      <AchiPanel />
                    </Grid>
                  } />
                <Route path='/apply'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, flexDirection: 'column' }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="sex-select">成果类型</InputLabel>
                          <Select
                            labelId="type-select"
                            id="type"
                            onChange={handleTypeChange}
                            label="成果类型"
                            sx={{ marginBottom: 5 }}
                          >
                            <MenuItem value="">
                              <em>未设置</em>
                            </MenuItem>
                            <MenuItem value={1}>期刊论文</MenuItem>
                            <MenuItem value={2}>会议论文</MenuItem>
                            <MenuItem value={3}>获奖</MenuItem>
                            <MenuItem value={4}>报刊文章</MenuItem>
                            <MenuItem value={5}>专著</MenuItem>
                            <MenuItem value={6}>专利</MenuItem>
                          </Select>
                        </FormControl>
                        {type == 1 && <PaperInfo onPaperChange={handleChange} />}
                        {type == 2 && <ConfpaperInfo onConfpaperChange={handleChange} />}
                        {type == 3 && <PrizeInfo onPrizeChange={handleChange} />}
                        {type == 4 && <ArticleInfo onArticleChange={handleChange} />}
                        {type == 5 && <BookInfo onBookChange={handleChange} />}
                        {type == 6 && <PatentInfo onPatentChange={handleChange} />}
                        <Button variant='contained' onClick={handleSubmit} sx={{ marginTop: 3 }}>
                          提交申请
                        </Button>
                      </Paper>
                    </Grid>
                  } />
                <Route path='/settings'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SettingPanel />
                      </Paper>
                    </Grid>
                  } />
                <Route path='/stat'
                  element={
                    <Grid item xs={12}>
                      <Paper>
                        <StatPanel />
                      </Paper>
                    </Grid>
                  }
                />
                <Route path='/paper/:id' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <PaperInfoEdit id={Object.values(useParams())[0].substring(6)} />
                    </Paper>
                  </Grid>
                } />
                <Route path='/paper/add' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <AddPaperPanel />
                    </Paper>
                  </Grid>
                } />
                <Route path='/confpaper/:id' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <ConfpaperInfoEdit id={Object.values(useParams())[0].substring(10)} />
                    </Paper>
                  </Grid>
                } />
                <Route path='/confpaper/add' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <AddConfpaperPanel />
                    </Paper>
                  </Grid>
                } />
                <Route path='/journal'>
                  <Route path='/journal' />
                  <Route path='/journal/:issn' element={
                    <Grid item xs={12}>
                      <JournalInfoEdit issn={
                        Object.values(useParams())[0].substring(8)
                      } />
                    </Grid>
                  } />
                </Route>
                <Route path='/newspaper'>
                  <Route path='/newspaper/:issn' element={
                    <Grid item xs={12}>
                      <NewspaperInfoEdit issn={Object.values(useParams())[0].substring(10)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/conference'>
                  <Route path='/conference/:id' element={
                    <Grid item xs={12}>
                      <ConfInfoEdit id={Object.values(useParams())[0].substring(11)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/article'>
                  <Route path='/article/:id' element={
                    <Grid item xs={12}>
                      <ArticleInfoEdit id={Object.values(useParams())[0].substring(8)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/book'>
                  <Route path='/book/:id' element={
                    <Grid item xs={12}>
                      <BookInfoEdit isbn={Object.values(useParams())[0].substring(5)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/patent'>
                  <Route path='/patent/:id' element={
                    <Grid item xs={12}>
                      <PatentInfoEdit patent_num={Object.values(useParams())[0].substring(7)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/prize'>
                  <Route path='/prize/:id' element={
                    <Grid item xs={12}>
                      <PrizeInfoEdit id={Object.values(useParams())[0].substring(7)} />
                    </Grid>
                  } />
                </Route>
              </Routes>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function ResearcherPanel() {
  return <ResearcherPanelContent />;
}
