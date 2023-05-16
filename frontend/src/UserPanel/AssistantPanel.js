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
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Tab, Tabs } from '@mui/material';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import BarChartIcon from '@mui/icons-material/BarChart';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import UserInfo from './UserInfo';
import { MessageBar } from '../MessageBar';
import { GetUser, SetUserInfo, DeleteUser, AddUser, GetApply, ApproveApply, RejectApply, GetPrize } from './Common';
import InfoTable from './InfoTable';
import { REACT_URL } from '../Constants';
import { AddPaperPanel, PaperInfoEdit } from './PaperPanel';
import { AddConfpaperPanel, ConfpaperInfoEdit } from './ConfpaperPanel';
import PublishPanel from './AdminPanel';
import { Route, Routes, useParams } from 'react-router-dom';
import { AddArticlePanel, ArticleInfoEdit } from './ArticlePanel';
import { AddPatentPanel, PatentInfoEdit } from './PatentPanel';
import { AddBookPanel, BookInfoEdit } from './BookPanel';
import { GetPaper, GetConfpaper, GetArticle, GetBook, GetPatent } from './Common';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { AddPrizePanel, PrizeInfoEdit } from './PrizePanel';


function AddFab(props) {
  return (
    <Fab
      onClick={props.handleClick}
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        float: 'right',
        float: 'right',
        bottom: 50,
        right: 100
      }}
    >
      <AddIcon />
    </Fab>
  );
}

var datapanel_paper_from = 0;
var datapanel_confpaper_from = 0;
var datapanel_article_from = 0;
var datapanel_book_from = 0;
var datapanel_patent_from = 0;
var datapanel_prize_from = 0;


function DataPanel() {
  var nomorepaper = false;

  const [paper, setPaper] = React.useState(null);
  React.useEffect(() => {
    GetPaper('all', datapanel_paper_from)
      .then((data) => {
        setPaper(data.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/paper/' + p.id}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const morePaper = (e) => {
    if (nomorepaper)
      return;
    datapanel_paper_from += 250;
    GetPaper('all', datapanel_paper_from)
      .then((data) => {
        if (!data) {
          nomorepaper = true;
          datapanel_paper_from = 0;
          return;
        }
        let newdata = paper.concat(data);
        setPaper(newdata.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/paper/' + p.id}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      });
  }

  var nomoreconfpaper = false;

  const [confpaper, setConfpaper] = React.useState(null);
  React.useEffect(() => {
    GetConfpaper('all', datapanel_confpaper_from)
      .then((data) => {
        setConfpaper(data.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/confpaper/' + p.id}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  const moreConfpaper = (e) => {
    if (nomoreconfpaper)
      return;
    datapanel_confpaper_from += 250;
    GetConfpaper('all', datapanel_confpaper_from)
      .then((data) => {
        if (!data) {
          nomoreconfpaper = true;
          datapanel_confpaper_from = 0;
          return;
        }
        let newdata = confpaper.concat(data);
        setConfpaper(newdata.map(cp => (
          {
            ...cp,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/confpaper/' + cp.id}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      });
  }


  var nomorearticle = false;

  const [article, setArticle] = React.useState(null);
  React.useEffect(() => {
    GetArticle('all', datapanel_article_from)
      .then((data) => {
        setArticle(data.map(a => (
          {
            ...a,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/article/' + a.id}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  const moreArticle = (e) => {
    if (nomorearticle)
      return;
    datapanel_article_from += 250;
    GetArticle('all', datapanel_article_from)
      .then((data) => {
        if (!data) {
          nomorearticle = true;
          datapanel_article_from = 0;
          return;
        }
        let newdata = article.concat(data);
        setArticle(newdata.map(a => (
          {
            ...a,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/article/' + a.id}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      });
  }

  var nomorebook = false;

  const [book, setBook] = React.useState(null);
  React.useEffect(() => {
    GetBook('all', datapanel_book_from)
      .then((data) => {
        setBook(data.map(b => (
          {
            ...b,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/book/' + b.isbn}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  const moreBook = (e) => {
    if (nomorebook)
      return;
    datapanel_book_from += 250;
    GetBook('all', datapanel_book_from)
      .then((data) => {
        if (!data) {
          nomorebook = true;
          datapanel_book_from = 0;
          return;
        }
        let newdata = book.concat(data);
        setBook(newdata.map(b => (
          {
            ...b,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/book/' + b.id}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      });
  }

  var nomorepatent = false;

  const [patent, setPatent] = React.useState(null);
  React.useEffect(() => {
    GetPatent('all', datapanel_patent_from)
      .then((data) => {
        setPatent(data.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/patent/' + p.patent_num}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  const morePatent = (e) => {
    if (nomorepatent)
      return;
    datapanel_patent_from += 250;
    GetPatent('all', datapanel_patent_from)
      .then((data) => {
        if (!data) {
          nomorepatent = true;
          datapanel_patent_from = 0;
          return;
        }
        let newdata = patent.concat(data);
        setPatent(newdata.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/patent/' + p.patent_num}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      });
  }

  var nomoreprize = false;

  const [prize, setPrize] = React.useState(null);
  React.useEffect(() => {
    GetPrize('all', datapanel_prize_from)
      .then((data) => {
        setPrize(data.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/prize/' + p.id}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  const morePrize = (e) => {
    if (nomoreprize)
      return;
    datapanel_prize_from += 250;
    GetPatent('all', datapanel_prize_from)
      .then((data) => {
        if (!data) {
          nomoreprize = true;
          datapanel_patent_from = 0;
          return;
        }
        let newdata = prize.concat(data);
        setPatent(newdata.map(p => (
          {
            ...p,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/prize/' + p.patent_num}>
                  编辑
                </Link>
              </Typography>
          }
        )));
      });
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange} aria-label="tab control">
          <Tab label="期刊论文" />
          <Tab label="会议论文" />
          <Tab label="报刊文章" />
          <Tab label="著作" />
          <Tab label="专利" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {
          value === 0 &&
          <Box>
            <InfoTable
              title='期刊论文'
              heads={['标题', '作者', '刊物', '链接', '操作']}
              rows={paper} />
            <Typography sx={{ marginTop: 4 }} fontSize={'small'} color="text.secondary">
              <Link component='button' onClick={morePaper}>
                查看更多
              </Link>
            </Typography>
            <AddFab handleClick={
              (e) => window.location.assign(REACT_URL + '/my/paper/add')
            } />
          </Box>
        }
        {
          value === 1 &&
          <Box>
            <InfoTable
              title='会议论文'
              heads={['标题', '作者', '会议名', '链接', '操作']}
              rows={confpaper}
            />
            <Typography sx={{ marginTop: 4 }} fontSize={'small'} color="text.secondary">
              <Link component='button' onClick={moreConfpaper}>
                查看更多
              </Link>
            </Typography>
            <AddFab handleClick={
              (e) => window.location.assign(REACT_URL + '/my/confpaper/add')
            } />
          </Box>
        }
        {
          value === 2 &&
          <Box>
            <InfoTable
              title='报刊文章'
              heads={['标题', '作者', '报纸名', '链接', '操作']}
              rows={article}
            />
            <Typography sx={{ marginTop: 4 }} fontSize={'small'} color="text.secondary">
              <Link component='button' onClick={moreArticle}>
                查看更多
              </Link>
            </Typography>
            <AddFab handleClick={
              (e) => window.location.assign(REACT_URL + '/my/article/add')
            } />
          </Box>
        }
        {
          value === 3 &&
          <Box>
            <InfoTable
              title='著作'
              heads={['题目', '书号', '作者', '出版社', '出版年', '出版地', '链接', '操作']}
              rows={book}
            />
            <Typography sx={{ marginTop: 4 }} fontSize={'small'} color="text.secondary">
              <Link component='button' onClick={moreBook}>
                查看更多
              </Link>
            </Typography>
            <AddFab handleClick={
              (e) => window.location.assign(REACT_URL + '/my/book/add')
            } />
          </Box>
        }
        {
          value === 4 &&
          <Box>
            <InfoTable
              title='专利'
              heads={['专利号', '公布号', '专利名', '申请人工号', '发明人',
                '专辑', '专题', '分类号', '主分类号', '链接', '操作']}
              rows={patent}
            />
            <Typography sx={{ marginTop: 4 }} fontSize={'small'} color="text.secondary">
              <Link component='button' onClick={morePatent}>
                查看更多
              </Link>
            </Typography>
            <AddFab handleClick={
              (e) => window.location.assign(REACT_URL + '/my/patent/add')
            } />
          </Box>
        }
        {
          value === 5 &&
          <Box>
            <InfoTable
              title='获奖'
              heads={['编号', '获奖名', '描述', '获奖日期', '操作']}
              rows={prize}
            />
            <Typography sx={{ marginTop: 4 }} fontSize={'small'} color="text.secondary">
              <Link component='button' onClick={morePrize}>
                查看更多
              </Link>
            </Typography>
            <AddFab handleClick={
              (e) => window.location.assign(REACT_URL + '/my/prize/add')
            } />
          </Box>
        }
      </Grid>
    </Grid>
  );
}


var pagesize = 100;
var paper_page = 1;
var confpaper_page = 1;
var article_page = 1;
var book_page = 1;
var patent_page = 1;
var prize_page = 1;

function ApplyPanel() {
  const [value, setValue] = React.useState(0);

  const [page, setPage] = React.useState(1);

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
      GetApply('paper', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPaper(data);
        }
        );
    }
    else if (value === 1) {
      GetApply('confpaper', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setConfPaper(data);
        }
        );
    }
    else if (value === 2) {
      GetApply('article', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setArticle(data);
        }
        );
    }
    else if (value === 3) {
      GetApply('book', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setBook(data);
        }
        );
    }
    else if (value === 4) {
      GetApply('patent', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPatent(data);
        }
        );
    }
    else if (value === 5) {
      GetApply('prize', 'all', from, to)
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
      GetApply('paper', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPaper(data);
        }
        );
    }
    else if (value === 1) {
      GetApply('confpaper', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setConfPaper(data);
        }
        );
    }
    else if (value === 2) {
      GetApply('article', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setArticle(data);
        }
        );
    }
    else if (value === 3) {
      GetApply('book', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setBook(data);
        }
        );
    }
    else if (value === 4) {
      GetApply('patent', 'all', from, to)
        .then(data => {
          if (data.length === 0)
            return;
          setPatent(data);
        }
        );
    }
    else if (value === 5) {
      GetApply('prize', 'all', from, to)
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
    } else if (value === 5) {
      return (prize_page - 1) * pagesize;
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
    } else if (value === 5) {
      return prize_page * pagesize;
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
    } else if (value === 5) {
      return prize_page;
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
    } else if (value === 5) {
      prize_page += 1;
      setPage(prize_page);
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
    } else if (value === 5) {
      prize_page -= 1;
      setPage(patent_page);
    }
  };

  const [paper, setPaper] = React.useState(null);
  React.useEffect(() => {
    GetApply('paper', 'all', from(), to())
      .then((data) => {
        setPaper(data);
      });
  }, []);

  const [confpaper, setConfPaper] = React.useState(null);
  React.useEffect(() => {
    GetApply('confpaper', 'all', from(), to())
      .then((data) => {
        setConfPaper(data);
      });
  }, []);

  const [article, setArticle] = React.useState(null);
  React.useEffect(() => {
    GetApply('article', 'all', from(), to())
      .then((data) => {
        setArticle(data);
      });
  }, []);

  const [book, setBook] = React.useState(null);
  React.useEffect(() => {
    GetApply('book', 'all', from(), to())
      .then((data) => {
        setBook(data);
      });
  }, []);

  const [patent, setPatent] = React.useState(null);
  React.useEffect(() => {
    GetApply('patent', 'all', from(), to())
      .then((data) => {
        setPatent(data);
      });
  }, []);

  const [prize, setPrize] = React.useState(null);
  React.useEffect(() => {
    GetApply('prize', 'all', from(), to())
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
          <Tab label="著作" />
          <Tab label="专利" />
          <Tab label="获奖" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {
          value === 0 &&
          <Box>
            <InfoTable
              title='申请列表'
              heads={['申请人工号', '论文编号', '状态', '操作']}
              rows={
                paper && paper.map((row) => (
                  {
                    applicant:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link href={REACT_URL + '/my/users/' + row.applicant}>
                          {row.applicant}
                        </Link>
                      </Typography>,
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
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => ApproveApply(row.id, 'paper')}
                        >
                          通过
                        </Link>
                        {' '}
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => RejectApply(row.id, 'paper')}
                        >
                          退回
                        </Link>
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
              title='申请列表'
              heads={['申请人工号', '会议论文编号', '状态', '操作']}
              rows={
                confpaper && confpaper.map((row) => (
                  {
                    applicant:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link href={REACT_URL + '/my/users/' + row.applicant}>
                          {row.applicant}
                        </Link>
                      </Typography>,
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
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => ApproveApply(row.id, 'confpaper')}
                        >
                          通过
                        </Link>
                        {' '}
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => RejectApply(row.id, 'confpaper')}
                        >
                          退回
                        </Link>
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
              title='申请列表'
              heads={['申请人工号', '报刊文章编号', '状态', '操作']}
              rows={
                article && article.map((row) => (
                  {
                    applicant:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link href={REACT_URL + '/my/users/' + row.applicant}>
                          {row.applicant}
                        </Link>
                      </Typography>,
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
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => ApproveApply(row.id, 'article')}
                        >
                          通过
                        </Link>
                        {' '}
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => RejectApply(row.id, 'article')}
                        >
                          退回
                        </Link>
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
              title='申请列表'
              heads={['申请人工号', '书号', '状态', '操作']}
              rows={
                book && book.map((row) => (
                  {
                    applicant:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link href={REACT_URL + '/my/users/' + row.applicant}>
                          {row.applicant}
                        </Link>
                      </Typography>,
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
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => ApproveApply(row.id, 'book')}
                        >
                          通过
                        </Link>
                        {' '}
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => RejectApply(row.id, 'book')}
                        >
                          退回
                        </Link>
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
              title='申请列表'
              heads={['申请人工号', '专利号', '状态', '操作']}
              rows={
                patent && patent.map((row) => (
                  {
                    applicant:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link href={REACT_URL + '/my/users/' + row.applicant}>
                          {row.applicant}
                        </Link>
                      </Typography>,
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
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => ApproveApply(row.id, 'patent')}
                        >
                          通过
                        </Link>
                        {' '}
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => RejectApply(row.id, 'patent')}
                        >
                          退回
                        </Link>
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
              title='申请列表'
              heads={['申请人工号', '获奖编号', '状态', '操作']}
              rows={
                prize && prize.map((row) => (
                  {
                    applicant:
                      <Typography fontSize={'small'} color="text.secondary">
                        <Link href={REACT_URL + '/my/users/' + row.applicant}>
                          {row.applicant}
                        </Link>
                      </Typography>,
                    id: row.id,
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
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => ApproveApply(row.id, 'prize')}
                        >
                          通过
                        </Link>
                        {' '}
                        <Link
                          component='button'
                          disabled={!row.status === 3}
                          color={row.status === 3 ? 'primary' : 'text.secondary'}
                          onClick={(e) => RejectApply(row.id, 'prize')}
                        >
                          退回
                        </Link>
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


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function AddUserPanel() {
  var id = '';
  var uname = '';
  var passwd = '';
  var sex = '';
  var dept = '';

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleUsrChange = (dict) => {
    usrdict = { ...dict };
  };

  var usrdict = {
    id: id,
    uname: uname,
    passwd: passwd,
    sex: sex,
    dept: dept
  };

  const doAddition = () => {
    AddUser(usrdict)
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
      <UserInfo
        onUsrChange={handleUsrChange}
        allowbasic={true}
        title={'新建用户'}
        id={id}
        uname={uname}
        passwd={passwd}
        dept={dept}
        sex={sex}
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


export const assistantListItems = (
  <React.Fragment>
    <ListItemButton href='/my/users'>
      <ListItemIcon>
        <PeopleAltRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="成员管理" />
    </ListItemButton>
    <ListItemButton href='/my/achi'>
      <ListItemIcon>
        <DescriptionRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="成果管理" />
    </ListItemButton>
    <ListItemButton href='/my/apply'>
      <ListItemIcon>
        <ApprovalRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="申请处理" />
    </ListItemButton>
    <ListItemButton href='/my/stat'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="统计信息" />
    </ListItemButton>
  </React.Fragment>
);


function UsrManage() {
  var uid = window.sessionStorage.getItem('id');

  const [users, setUsers] = React.useState(null);
  React.useEffect(() => {
    GetUser(uid, null)
      .then((data) => {
        setUsers(data.map(usr => (
          {
            ...usr,
            action:
              <Typography fontSize={'small'} color="text.secondary">
                <Link href={REACT_URL + '/my/users/' + usr.id}>
                  编辑
                </Link>
              </Typography>
          })));
      });
  }, []);

  return (
    <InfoTable
      title='成员列表'
      heads={['工号', '用户类型', '姓名', '密码', '性别', '部门', '操作']}
      rows={users}
    />
  );
}


function UserInfoEdit(props) {
  const [id, setId] = React.useState(props.id);
  const [uname, setUname] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [dept, setDept] = React.useState('');

  var uid = window.sessionStorage.getItem('id');

  var loadfinish = false;
  React.useEffect(() => {
    GetUser(uid, props.id)
      .then((data) => {
        setId(data['id']);
        setUname(data['name']);
        setPasswd(data['passwd']);
        setSex(data['sex']);
        setDept(data['dept']);
      });
    loadfinish = true;
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleUsrChange = (dict) => {
    usrdict = { ...dict };
    usrUpdated = true;
  };

  const doUpdate = (e) => {
    if (!loadfinish)
      return;
    if (usrUpdated) {
      var succeed = SetUserInfo(props.id, usrdict);
      if (!succeed)
        setOpen(true);
      if (id != props.id)
        props.id = id;
    }
  };

  const doDelete = (e) => {
    DeleteUser(props.id)
      .then(s => window.location.replace(REACT_URL + 'my/users'),
        f => setOpen(true));
  };

  var usrUpdated = false;
  var usrdict = {
    id: id,
    uname: uname,
    passwd: passwd,
    sex: sex,
    dept: dept
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
      <UserInfo
        onUsrChange={handleUsrChange}
        allowbasic={true}
        title={'编辑用户信息'}
        id={id}
        uname={uname}
        passwd={passwd}
        dept={dept}
        sex={sex}
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
        删除用户
      </Button>
    </Grid>
  );
}


const mdTheme = createTheme();

function AssistantPanelContent() {
  const doUserAddition = () => {
    window.location.assign(REACT_URL + '/my/users/add');
  }

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
            {assistantListItems}
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
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <UsrManage />
                      </Paper>
                      <AddFab handleClick={doUserAddition} />
                    </Grid>
                  } />
                <Route path='/users'
                  element={
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <UsrManage />
                      </Paper>
                      <AddFab handleClick={doUserAddition} />
                    </Grid>
                  } />
                <Route path='/users/add' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <AddUserPanel />
                    </Paper>
                  </Grid>} />
                <Route path='/users/:id' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <UserInfoEdit id={useParams().id} />
                    </Paper>
                  </Grid>} />
                <Route path='/achi' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <DataPanel />
                    </Paper>
                  </Grid>} />
                <Route path='/apply' element={
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <ApplyPanel />
                    </Paper>
                  </Grid>} />
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
                <Route path='/published' element={
                  <Grid item xs={12}>
                    <PublishPanel />
                  </Grid>
                } />
                <Route path='/article'>
                  <Route path='/article/add' element={
                    <Grid item xs={12}>
                      <AddArticlePanel />
                    </Grid>
                  } />
                  <Route path='/article/:id' element={
                    <Grid item xs={12}>
                      <ArticleInfoEdit id={Object.values(useParams())[0].substring(8)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/book'>
                  <Route path='/book/add' element={
                    <Grid item xs={12}>
                      <AddBookPanel />
                    </Grid>
                  } />
                  <Route path='/book/:id' element={
                    <Grid item xs={12}>
                      <BookInfoEdit isbn={Object.values(useParams())[0].substring(5)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/patent'>
                  <Route path='/patent/add' element={
                    <Grid item xs={12}>
                      <AddPatentPanel />
                    </Grid>
                  } />
                  <Route path='/patent/:id' element={
                    <Grid item xs={12}>
                      <PatentInfoEdit patent_num={Object.values(useParams())[0].substring(7)} />
                    </Grid>
                  } />
                </Route>
                <Route path='/prize'>
                  <Route path='/prize/add' element={
                    <Grid item xs={12}>
                      <AddPrizePanel />
                    </Grid>
                  } />
                  <Route path='/prize/:id' element={
                    <Grid item xs={12}>
                      <PrizeInfoEdit id={Object.values(useParams())[0].substring(6)} />
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

export default function AssistantPanel() {
  return <AssistantPanelContent />;
}
