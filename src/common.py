from dataclasses import dataclass
from datetime import date
from enum import Enum

# format of user id:
# 00-00-000: admin
# school_code_: 01~99
# dept_code_: 01~99
# ident_code_: 001~999

class UserType(Enum):
    ADMIN = 0
    RESEARCHER = 1
    ASSISTANT = 2

class Sex(Enum):
    FEMALE = 0
    MALE = 1

@dataclass(order = True)
class User:
    id_: str
    type_: UserType
    name_: str
    passwd_: str
    sex_: Sex
    dept_: str


@dataclass(order = True)
class Researcher:
    id_: str
    position_: str
    profile_: str
    work_: str
    photo_link_: str


class PublishPeriod(Enum):
    MONTHLY = 0
    SEASONLY = 1

class Zone(Enum):
    FIRST = 1
    SECOND = 2
    THIRD = 3
    FOURTH = 4

@dataclass
class Journal:
    apply_num_: str
    issn_: str
    title_: str
    host_: str
    period_: PublishPeriod
    inf_factor_: float
    zone_: Zone
    pic_link_: str
    ext_link_: str

@dataclass
class Paper:
    apply_num_: str
    issn_: str
    title_: str
    author_: str
    link_: str


@dataclass
class Newspaper:
    apply_num_: str
    issn_: str
    title_: str
    authority_: str
    host_: str
    city_: str
    address_: str
    postcode_: str
    phone_num_: str
    pic_link_: str
    ext_link_: str

@dataclass
class Article:
    apply_num_: str
    issn_: str
    title_: str
    author_: str
    link_: str


@dataclass
class Conference:
    id_: int
    name_: str
    time_: date
    place_: str
    association_: str
    publisher_: str
    publish_date_: date
    chief_edit_: str
    editors_: str
    pic_link_: str
    ext_link_: str

@dataclass
class ConferencePaper:
    apply_num_: str
    id_: int
    title_: str
    author_: str
    link_: str


@dataclass
class Book:
    apply_num_: str
    isbn_: str
    author_: str
    publisher_: str
    publish_year_: date
    place_publish_: str
    pic_link_: str
    ext_link_: str


@dataclass
class Patent:
    apply_num_: str
    patent_num_: str
    promulgate_num_: str
    name_: str
    applyer_: str
    inventor_: str
    issue_: str
    theme_: str
    cata_num_: str
    maj_cata_: str
    ext_link_: str


@dataclass
class PaperApply:
    apply_num_: str
    author_id_: str
    issn_: str
    processed_: bool

@dataclass
class ArticleApply:
    apply_num_: str
    author_id_: str
    issn_: str
    processed_: bool

@dataclass
class ConfPaperApply:
    apply_num_: str
    author_id_: str
    id_: int
    processed_: bool

@dataclass
class BookApply:
    apply_num_: str
    author_id_: str
    isbn_: str
    processed_: bool

@dataclass
class PatentApply:
    apply_num_: str
    author_id_: str
    patent_num_: str
    processed_: bool
