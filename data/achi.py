import csv
import random


if __name__ == '__main__':
    reslist = []
    with open('user.csv', 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for usr in reader:
            if usr['id'][2:4] == '01':
                reslist.append((usr['id'], usr['name']))


def get_date():
    return '%4d-%02d-%02d' % (
        random.randint(1990, 2023),
        random.randint(1, 12),
        random.randint(1, 28))


def get_isbn():
    return ''.join([str(random.randint(0, 9)) for i in range(8)])


def get_patent_num():
    return ''.join([str(random.randint(0, 9)) for i in range(13)])


def get_promulate_num():
    return ''.join([str(random.randint(0, 9)) for i in range(12)])


def get_paper():
    jourlist = []
    with open('journal.csv', 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for jour in reader:
            jourlist.append(jour['issn'])

    titles = ['论 xxxx', '论 xxxxx 在 xxxxx 中的应用',
              'xxxxx 刍议', 'xxxxx 浅析', 'xxxxx 小议',
              'xxx 在 zzz 时促进了 yyy', 'xxxx 对 yyy 有重大影响',
              'xxx improves yyy', 'xxx has facilitated yyy']

    with open('paper.csv', 'w+', encoding='utf-8') as file:
        writer = csv.DictWriter(
            file,
            [
                'id', 'issn', 'title', 'author', 'page', 'volume',
                'number', 'publish_date', 'link'
            ])
        file.write('id,issn,title,author,page,volume,number,publish_date,link\n\n')
        id = 0
        for res in reslist:
            for i in range(10, 50):   
                startpage = random.randint(1, 1000)
                writer.writerow(
                    {
                        'id': id,
                        'issn': random.choice(jourlist),
                        'title': random.choice(titles),
                        'author': res[1] + '，' + ''.join([usr[1] + '，' for usr in random.choices(reslist, k=random.randint(0, 3))]),
                        'page': '%d-%d' % (startpage, startpage + random.randint(3, 50)),
                        'volume': random.randint(1, 1000),
                        'number': random.randint(1, 12),
                        'publish_date': get_date(),
                        'link': 'www.xxxxx.com'
                    }
                )
                id += 1


def get_article():
    nplist = []
    with open('newspaper.csv', 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for np in reader:
            nplist.append(np['issn'])

    with open('article.csv', 'w+', encoding='utf-8') as file:
        titles = ['论 xxxx', '论 xxxxx 在 xxxxx 中的应用',
              'xxxxx 刍议', 'xxxxx 浅析', 'xxxxx 小议',
              'xxx 在 zzz 时促进了 yyy', 'xxxx 对 yyy 有重大影响',
              'xxx improves yyy', 'xxx has facilitated yyy']
        writer = csv.DictWriter(
            file,
            [
                'id', 'issn', 'title', 'author', 'version', 'publish_date', 'link'
            ])
        file.write('id,issn,title,author,version,publish_date,link\n\n')
        id = 0
        for res in reslist:
            for i in range(10, 50):
                writer.writerow(
                    {
                        'id': id,
                        'issn': random.choice(nplist),
                        'title': random.choice(titles),
                        'author': res[1],
                        'version': random.randint(1, 24),
                        'publish_date': get_date(),
                        'link': 'www.xxxxx.com'
                    }
                )
                id += 1


def get_conf_paper():
    conflist = []
    with open('conf.csv', 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for conf in reader:
            conflist.append(conf['id'])

    with open('confpaper.csv', 'w+', encoding='utf-8') as file:
        writer = csv.DictWriter(
            file,
            [
                'id', 'cid', 'title', 'author', 'page', 'publish_date', 'link'
            ])
        file.write('id,cid,title,author,page,publish_date,link\n\n')
        id = 0
        for res in reslist:
            for i in range(10, 50):
                writer.writerow(
                    {
                        'id': id,
                        'cid': random.choice(conflist),
                        'title': 'xxxxxxxxxxx',
                        'author': res[1],
                        'page': random.randint(1, 1000),
                        'publish_date': get_date(),
                        'link': 'www.xxxxx.com'
                    }
                )
                id += 1


def get_book():
    with open('book.csv', 'w+', encoding='utf-8') as file:
        writer = csv.DictWriter(
            file,
            [
                'isbn', 'title', 'author', 'publisher', 'publish_year',
                'place_published', 'picture', 'link'
            ])
        titles = [
            '论 xxxx', '论 xxxxx 在 xxxxx 中的应用', 'xxxxx 刍议',
            'xxxxx 浅析', 'xxxxx 小议', 'xxx 在 zzz 时促进了 yyy',
            'xxxx 对 yyy 有重大影响', 'xxx improves yyy',
            'xxx has facilitated yyy'
        ]
        publisher = [
            '商务印书馆', '人民邮电出版社', '清华大学出版社',
            '北京大学出版社', '北京邮电大学出版社', '北京理工大学出版社',
            '北京师范大学出版社', '北京航空航天大学出版社',
            '北京科技大学出版社', '北京语言大学出版社', '北京外国语大学出版社',
            '北京体育大学出版社', '北京电子科技学院出版社', '北京印刷学院出版社',
            '河北人民出版社', '河北科技大学出版社', '河北工业大学出版社',
            '河北农业大学出版社', '河北师范大学出版社', '河北医科大学出版社'
            '人民文学出版社', '人民音乐出版社', '人民美术出版社',
            '人民教育出版社', '苏州大学出版社', '南京大学出版社',
            '南京航空航天大学出版社', '南京理工大学出版社', '南京农业大学出版社',
        ]
        place_published = [
            '北京', '上海', '广州', '深圳', '武汉', '西安', '成都', '重庆',
            '长沙', '南京', '杭州', '苏州', '天津', '青岛', '郑州', '沈阳',
            '大连', '长春', '哈尔滨', '济南', '石家庄', '太原', '合肥', '南昌',
            '福州', '厦门', '南宁', '海口', '贵阳', '昆明', '西宁', '兰州',
        ]
        file.write('isbn,title,author,publisher,publish_year,place_published,picture,link\n\n')
        for res in reslist:
            for i in range(10, 30):
                writer.writerow(
                    {
                        'isbn': get_isbn(),
                        'title': random.choice(titles),
                        'author': res[1],
                        'publisher': random.choice(publisher),
                        'publish_year': get_date(),
                        'place_published': random.choice(place_published),
                        'picture': '',
                        'link': 'www.xxxxx.com'
                    }
                )


def get_patent():
    with open('patent.csv', 'w+', encoding='utf-8') as file:
        patent_name = [
            '一种新型加工机制', '一种用于治疗心血管疾病的方法', '一种新型软件系统',
            '一种新型机械装置', '一种新型电子设备', '一种新型电子产品', '一种制备方法和工艺',
            '一种改进xx工艺的装置', '一种改进xx工艺的方法', '一种改进xx工艺的机械装置',
            '一种新型软件编译方法', '一种新型软件编译系统', '一种新型软件编译工具',
            '一种新型软件系统'
        ]
        
        writer = csv.DictWriter(
            file,
            [
                'patent_num', 'promulgate_num', 'name', 'applyer', 'inventor',
                'issue', 'theme', 'catagory_num', 'major_catagory', 'link'
            ])
        file.write('patent_num,promulgate_num,name,applyer,inventor,issue,theme,catagory_num,major_catagory,link\n\n')
        for res in reslist:
            for i in range(0, 20):
                writer.writerow(
                    {
                        'patent_num': get_patent_num(),
                        'promulgate_num': get_promulate_num(),
                        'name': random.choice(patent_name),
                        'applyer': res[1],
                        'inventor': res[1] + '，' + ''.join([usr[1] + '，' for usr in random.choices(reslist, k=random.randint(0, 3))]),
                        'issue': 'xxxxxxxxxxxxxx',
                        'theme': 'xxxxxxxxxxx',
                        'catagory_num': 'xxxxxxxxxxxx',
                        'major_catagory': 'xxxxx',
                        'link': 'www.xxxxx.com'
                    }
                )


if __name__ == '__main__':
    #get_paper()
   # get_article()
   # get_book()
  #  get_conf_paper()
    get_patent()
