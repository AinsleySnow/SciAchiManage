import mysql.connector
import common
from dataclasses import dataclass
from datetime import date
from copy import deepcopy
from strbuilder import StringBuilder


@dataclass(order = True)
class Database:
    user_: str
    passwd_: str
    host_: str
    name_: str


class Cursor:
    def __init__(self, cursor) -> None:
        self.__cursor_ = cursor

    def __enter__(self):
        return self

    def __exit__(self):
        self.close()

    def __insert_comma(self, eles: list) -> None:
        i = 1
        ele_num = len(eles)
        while i < ele_num * 2 - 2:
            eles.insert(i, ', ')
            i += 2

    def insert_into(self, table: str, **args) -> None:
        sb = StringBuilder()
        sb.append('INSERT INTO ')
        sb.append(table, ' (')

        fields = val = []
        for arg_name in args:
            fields.append(arg_name)
            val.append('%%(', arg_name, ')s')

        self.__insert_comma(fields)
        self.__insert_comma(val)

        sb.append(*fields, ') VALUE (', *val, ')')
        self.__cursor_.execute(sb.build(), args)


    def set_column(self, table: str, where: str, **args):
        sb = StringBuilder('UPDATE ', table, ' SET ')
        pair = []
        for key in args:
            pair.append('%s = \'%s\'' % (key, args[key]))

        self.__insert_comma(pair)
        sb.extend(pair)
        sb.append(where)
        self.__cursor_.execute(sb.build())


    def select_from(self, table: str, *args):
        sb = StringBuilder()
        sb.append('SELECT ')

        self.__insert_comma(args)
        sb.append(*args)
        sb.append(' FROM ', table)

        self.__cursor_.execute(sb.build())
        return self.__cursor_.fetchall()


    def select_from_where(self, table: str, *args, where: str):
        sb = StringBuilder()
        sb.append('SELECT ')

        self.__insert_comma(args)
        sb.append(*args)
        sb.append(' FROM ', table)
        sb.append(' WHERE ', where)

        self.__cursor_.execute(sb.build())
        self.__cursor_.fetchall()
        return self


    def close(self):
        self.__cursor_.close()

    @property
    def lastrowid_(self):
        return self.__cursor_.lastrowid


class DBSession:
    database_: Database = None

    def __init__(self, db: Database = None) -> None:
        self.__cnx_ = None
        self.set_database(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        self.close()

    def set_database(self, db: Database) -> None:
        if (not db) or DBSession.database_ == db:
            return
        DBSession.database_ = deepcopy(db)

    def connect(self):
        self.__cnx_ = mysql.connector.connect(
            DBSession.database_.user_,
            DBSession.database_.passwd_,
            DBSession.database_.host_,
            DBSession.database_.name_)

    def close(self):
        if self.__cnx_:
            self.__cnx_.close()

    @property
    def cursor_(self) -> Cursor:
        return Cursor(self.__cnx_.cursor())



class UserSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    def get_user_by_id(self, id: str) -> common.User:
        with self.cursor_.select_from_where('Users', '*', 'id = %s' % id) as fields:
            for field in fields:
                return common.User(
                    field[0], field[1], field[2],
                    field[3], field[4], field[5], field[6])

    def get_passwd_by_id(self, id: str) -> str:
        with self.cursor_.select_from_where(
            'Users', 'passwd', 'id = %s' % id) as fields:
            for field in fields:
                return field

    def insert_user(self, user: common.User) -> None:
        with self.cursor_ as cur:
            udict = {
                'id': user.id_,
                'type': user.type_,
                'name': user.name_,
                'passwd': user.passwd_,
                'sex': user.sex_,
                'dept': user.dept_
            }
            cur.insert_into('User', **udict)

    def set_passwd_by_id(self, id: str, newpasswd: str) -> None:
        with self.cursor_ as cur:
            cur.set_column(
                'User', 'id = %s' % id, { 'passwd': newpasswd })

    def set_dept_by_id(self, id: str, dept: str):
        with self.cursor_ as cur:
            cur.set_column(
                'User', 'id = %s' % id, { 'dept': dept })



class ResearcherSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    def get_column_by_id(self, *col, id: str):
        return self.cursor_.select_from_where('Researcher', col, 'id = %s' % id)

    # without picture
    def get_resercher_by_id(self, id: str):
        with self.cursor_.select_from_where('Researcher', '*', 'id = %s' % id) as records:
            for record in records:
                return common.Researcher(
                    record[0], record[1],
                    record[2], record[3], None)

    def get_position_by_id(self, id: str) -> str:
        with self.get_column_by_id('position', id) as positions:
            for pos in positions:
                return pos

    def get_profile_by_id(self, id: str) -> str:
        with self.get_column_by_id('profile', id) as profiles:
            for profile in profiles:
                return profile

    def get_work_by_id(self, id: str) -> str:
        with self.get_column_by_id('work', id) as works:
            for work in works:
                return work

    def get_photo_by_id(self, id: str) -> str:
        with self.get_column_by_id('photo', id) as photos:
            for photo in photos:
                return photo

    def insert_researcher(self, res: common.Researcher):
        resdict = {
            'id': res.id_,
            'position': res.position_,
            'profile': res.profile_,
            'work': res.work_,
            'photo': None
        }
        with self.cursor_ as cur:
            cur.insert_into('Researcher', **resdict)

    def set_position_by_id(self, id: str, newpos: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Researcher', 'id = %s' % id, { 'position': newpos })

    def set_profile_by_id(self, id: str, newpf: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Researcher', 'id = %s' % id, { 'position': newpf })

    def set_photo_by_id(self, id: str, newphoto):
        with self.cursor_ as cur:
            cur.set_column(
                'Researcher', 'id = %s' % id, { 'position': newphoto })



class JournalSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    # without pic
    def get_journal_by_issn(self, issn: str):
        with self.cursor_.select_from_where(
            'Journal', '*', 'issn = %s' % issn) as record:
            for r in record:
                return common.Journal(
                    r[0], r[1], r[2],
                    r[3], r[4], r[5],
                    None, r[7])

    def get_picture_by_issn(self, issn: str):
        with self.cursor_.select_from_where(
            'Journal', 'picture', 'issn = %s' % issn) as record:
            for r in record:
                return r

    def insert_journal(self, jour: common.Journal):
        jourdict = {
            'issn': jour.issn_,
            'title': jour.title_,
            'host': jour.host_,
            'period': jour.period_,
            'inf_factor': jour.inf_factor_,
            'zone': jour.zone_,
            'picture': None,
            'link': jour.ext_link_
        }
        with self.cursor_ as cur:
            cur.insert_into('Journal', **jourdict)

    def set_title_by_issn(self, issn: str, title: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'title': title })

    def set_host_by_issn(self, issn: str, host: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'host': host })

    def set_period_by_issn(self, issn: str, period: common.PublishPeriod):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'period': period })

    def set_inf_factor_by_issn(self, issn: str, factor: float):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'inf_factor': factor })

    def set_zone_by_issn(self, issn: str, zone: common.Zone):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'zone': zone })

    def set_pic_by_issn(self, issn: str, pic):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'picture': pic })

    def set_link_by_issn(self, issn: str, link: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Journal', 'issn = %s' % issn, { 'link': link })



class PaperSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    def get_paper_by_apply_num(self, num: str):
        with self.cursor_.select_from_where(
            'Paper', '*', 'applynum = %s' % num) as record:
            for r in record:
                return common.Paper(
                    r[0], r[1], r[2],
                    r[3], r[4])

    def insert_paper(self, paper: common.Paper):
        paperdict = {
            'applynum': paper.apply_num_,
            'issn': paper.issn_,
            'title': paper.title_,
            'author': paper.author_,
            'link': paper.ext_link_
        }
        with self.cursor_ as cur:
            cur.insert_into('Paper', **paperdict)

    def set_title_by_issn(self, issn: str, title: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Paper', 'issn = %s' % issn, { 'title': title })

    def set_author_by_issn(self, issn: str, link: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Paper', 'issn = %s' % issn, { 'link': link })

    def set_link_by_issn(self, issn: str, link: str):
        with self.cursor_ as cur:
            cur.set_column(
                'Paper', 'issn = %s' % issn, { 'link': link })



class ConferenceSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    # without pic
    def get_conference_by_id(self, id: int):
        with self.cursor_.select_from_where(
            'Conference', '*', 'id = %d' % id) as record:
            for r in record:
                return common.Conference(
                    r[0], r[1], r[2],
                    r[3], r[4], r[5],
                    r[6], r[7], r[8],
                    None, r[10])

    def get_pic_by_id(self, id: int):
        with self.cursor_.select_from_where(
            'Conference', 'picture', 'id = %d' % id) as record:
            for r in record:
                return r

    def insert_conference(self, conf: common.Conference):
        confdict = {
            'id': conf.id_,
            'name': conf.name_,
            'time': conf.time_,
            'place': conf.place_,
            'association': conf.association_,
            'publisher': conf.publisher_,
            'publish_date': conf.publish_date_,
            'chief_editor': conf.chief_edit_,
            'editors': conf.editors_,
            'picture': None,
            'link': conf.ext_link_
        }
        with self.cursor_ as cur:
            cur.insert_into('Conference', **confdict)

    def set_conf_pic_by_id(self, id: int, pic):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'picture': pic })
    
    def set_name_by_id(self, id: int, name: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'name': name })

    def set_time_by_id(self, id: int, time: date):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'time': time })

    def set_place_by_id(self, id: int, place: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'place': place })

    def set_association_by_id(self, id: int, association: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'association': association })

    def set_publisher_by_id(self, id: int, pub: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'publisher': pub })

    def set_pub_date_by_id(self, id: int, pubd: date):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'publish_date': pubd })

    def set_chf_edit_by_id(self, id: int, chf: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'chief_editor': chf })

    def set_editors_by_id(self, id: int, edit: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'editors': edit })

    def set_picture_by_id(self, id: int, pic):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'picture': pic })

    def set_link_by_id(self, id: int, link: str):
        with self.cursor_ as cur:
            cur.set_column('Conference', 'id = %d' % id, { 'link': link })



class ConfPaperSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    def get_confpaper_by_applynum(self, num: str):
        with self.cursor_.select_from_where(
            'ConferencePaper', '*', 'applynum = %s' % num) as record:
            for r in record:
                return common.ConferencePaper(
                    r[0], r[1], r[2],
                    r[3], r[4])

    def insert_confpaper(self, confpaper: common.ConferencePaper):
        confpaperdict = {
            'applynum': confpaper.apply_num_,
            'id': confpaper.id_,
            'title': confpaper.title_,
            'author': confpaper.author,
            'link': confpaper.ext_link_
        }
        with self.cursor_ as cur:
            cur.insert_into('ConferencePaper', **confpaperdict)

    def set_id_by_applynum(self, applynum: str, id: int):
        with self.cursor_ as cur:
            cur.set_column(
                'ConferencePaper', 'applynum = %s' % applynum, { 'id': id })

    def set_title_by_applynum(self, applynum: str, title: str):
        with self.cursor_ as cur:
            cur.set_column(
                'ConferencePaper', 'applynum = %s' % applynum, { 'title': title })

    def set_author_by_applynum(self, applynum: str, author: str):
        with self.cursor_ as cur:
            cur.set_column(
                'ConferencePaper', 'applynum = %s' % applynum, { 'author': author })

    def set_link_by_applynum(self, applynum: str, link: str):
        with self.cursor_ as cur:
            cur.set_column(
                'ConferencePaper', 'applynum = %s' % applynum, { 'link': link })



class BookSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    # without pic
    def get_book_by_apply_num(self, num: str):
        with self.cursor_.select_from_where(
            'Book', '*', 'applynum = %s' % num) as record:
            for r in record:
                return common.Book(
                    r[0], r[1], r[2],
                    r[3], r[4], r[5],
                    None, None)

    def get_book_by_isbn(self, isbn: str):
        with self.cursor_.select_from_where(
            'Book', '*', 'isbn = %s' % isbn) as record:
            for r in record:
                return common.Book(
                    r[0], r[1], r[2],
                    r[3], r[4], r[5], None)

    def get_picture_by_isbn(self, isbn: str):
        with self.cursor_.select_from_where(
            'Book', 'picture', 'isbn = %s' % isbn) as record:
            for r in record:
                return r

    def set_author_by_isbn(self, isbn: str, author: str):
        with self.cursor_ as cur:
            cur.set_column('Book', 'isbn = %s' % isbn, { 'author': author })

    def set_publisher_by_isbn(self, isbn: str, pub: str):
        with self.cursor_ as cur:
            cur.set_column('Book', 'isbn = %s' % isbn, { 'publisher': pub })

    def set_pub_year_by_isbn(self, isbn: str, pub_year: date):
        with self.cursor_ as cur:
            cur.set_column('Book', 'isbn = %s' % isbn, { 'publish_year': pub_year })

    def set_place_by_isbn(self, isbn: str, place: str):
        with self.cursor_ as cur:
            cur.set_column('Book', 'isbn = %s' % isbn, { 'place': place })

    def set_pic_by_isbn(self, isbn: str, pic):
        with self.cursor_ as cur:
            cur.set_column('Book', 'isbn = %s' % isbn, { 'picture': pic })

    def set_link_by_isbn(self, isbn: str, link: str):
        with self.cursor_ as cur:
            cur.set_column('Book', 'isbn = %s' % isbn, { 'link': link })



class PatentSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    def get_patent_by_apply_num(self, num: str):
        with self.cursor_.select_from_where(
            'Patent', '*', 'applynum = %s' % num) as record:
            for r in record:
                return common.Patent(
                    r[0], r[1], r[2],
                    r[3], r[4], r[5],
                    r[6], r[7], r[8], r[9])

    def set_promulgate_by_patent_num(self, patent: str, pro: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'promulgate_num': pro })

    def set_name_by_patent_num(self, patent: str, name: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'name': name })

    def set_applyer_by_patent_num(self, patent: str, applyer: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'applyer': applyer })

    def set_inventor_by_patent_num(self, patent: str, inv: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'inventor': inv })

    def set_issue_by_patent_num(self, patent: str, cata_num: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'catagory_num': cata_num })

    def set_theme_by_patent_num(self, patent: str, theme: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'theme': theme })

    def set_cata_by_patent_num(self, patent: str, cata_num: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'catagory_num': cata_num })

    def set_maj_cata_by_patent_num(self, patent: str, maj_cata):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'major_catagory': maj_cata })

    def set_link_by_patent_num(self, patent: str, link: str):
        with self.cursor_ as cur:
            cur.set_column('Patent', 'patent_num = %s' % patent, { 'link': link })



class AuthorWorkSession(DBSession):
    def __init__(self, db: Database = None) -> None:
        super().__init__(db)

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self):
        super().close()

    def get_paper_apply_by_id(self, id: str, processed: bool):
        if processed: constrain = 'appilcant = %s AND status = processed' % id
        else: constrain = 'appilcant = %s' % id

        with self.cursor_.select_from_where(
            'JournalAuthor', '*', constrain) as nums:
            return (common.PaperApply(num[0], num[1], num[2], num[3]) for num in nums)


    def get_article_apply_by_id(self, id: str, processed: bool):
        if processed: constrain = 'appilcant = %s AND status = processed' % id
        else: constrain = 'appilcant = %s' % id

        with self.cursor_.select_from_where(
            'NewspaperAuthor', '*', constrain) as nums:
            return (common.ArticleApply(num[0], num[1], num[2], num[3]) for num in nums)


    def get_conf_paper_apply_by_id(self, id: str, processed: bool):
        if processed: constrain = 'appilcant = %s AND status = processed' % id
        else: constrain = 'appilcant = %s' % id

        with self.cursor_.select_from_where(
            'ConferenceAuthor', '*', constrain) as nums:
            return (common.ConfPaperApply(num[0], num[1], num[2], num[3]) for num in nums)


    def get_book_apply_by_id(self, id: str, processed: bool):
        if processed: constrain = 'appilcant = %s AND status = processed' % id
        else: constrain = 'appilcant = %s' % id

        with self.cursor_.select_from_where(
            'BookAuthor', 'applynum', constrain) as nums:
            return (common.BookApply(num[0], num[1], num[2], num[3]) for num in nums)


    def get_patent_apply_by_id(self, id: str, processed: bool):
        if processed: constrain = 'appilcant = %s AND status = processed' % id
        else: constrain = 'appilcant = %s' % id

        with self.cursor_.select_from_where(
            'PatentAuthor', '*', constrain) as nums:
            return (common.PatentApply(num[0], num[1], num[2], num[3]) for num in nums)


    def insert_paper_apply(self, apply: common.PaperApply):
        with self.cursor_ as cur:
            applydict = {
                'applynum': apply.apply_num_,
                'applicant': apply.author_id_,
                'issn': apply.issn_,
                'status': apply.processed_
            }
            cur.insert_into('JournalAuthor', **applydict)


    def insert_article_apply(self, apply: common.ArticleApply):
        with self.cursor_ as cur:
            applydict = {
                'applynum': apply.apply_num_,
                'applicant': apply.author_,
                'issn': apply.issn_,
                'status': apply.processed_
            }
            cur.insert_into('NewspaperAuthor', **applydict)


    def insert_confpaper_apply(self, apply: common.ConfPaperApply):
        with self.cursor_ as cur:
            applydict = {
                'applynum': apply.apply_num_,
                'applicant': apply.author_,
                'id': apply.id_,
                'status': apply.processed_
            }
            cur.insert_into('ConferenceAuthor', **applydict)


    def insert_book_apply(self, apply: common.BookApply):
        with self.cursor_ as cur:
            applydict = {
                'applynum': apply.apply_num_,
                'applicant': apply.author_,
                'isbn': apply.issn_,
                'status': apply.processed_
            }
            cur.insert_into('BookAuthor', **applydict)


    def set_paper_status_by_applynum(self, applynum: str, status: str):
        with self.cursor_ as cur:
            cur.set_column('JournalAuthor', 'applynum = %s' % applynum, { 'status': status })

    def set_article_status_by_applynum(self, applynum: str, status):
        with self.cursor_ as cur:
            cur.set_column('NewspaperAuthor', 'applynum = %s' % applynum, { 'status': status })

    def set_conf_paper_status_by_applynum(self, applynum: str, status):
        with self.cursor_ as cur:
            cur.set_column('ConferenceAuthor', 'applynum = %s' % applynum, { 'status': status })

    def set_book_status_by_applynum(self, applynum: str, status):
        with self.cursor_ as cur:
            cur.set_column('BookAuthor', 'applynum = %s' % applynum, { 'status': status })

    def set_patent_status_by_applynum(self, applynum: str, status):
        with self.cursor_ as cur:
            cur.set_column('PatentAuthor', 'applynum = %s' % applynum, { 'status': status })
