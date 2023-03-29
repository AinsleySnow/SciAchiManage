from PIL import Image, ImageDraw, ImageFont
import random
import csv



def get_issn():
    return ''.join([str(random.randint(0, 9)) for i in range(8)])


def get_journals():
    subject = [
        '物理', '化学', '计算机',
        '数学', '心理', '教育',
        '当代文学', '比较文学'
    ]

    journal = [
        '进展', '研究', '应用', '月刊', '学报'
    ]

    i = 0
    with open('journal.csv', 'w+', encoding='utf-8') as file:
        file.write('issn,title,host,period,inf_factor,zone,picture,link\n')
        csvwriter = csv.DictWriter(file, ['issn', 'title', 'host', 'period', 'inf_factor', 'zone', 'picture', 'link'])
        for s in subject:
            for j in journal:
                issn = get_issn()
                title = s + j
                host = '中国' + s + '研究所'
                period = random.choice([1,2])
                inf_factor = random.uniform(0.001, 20.01)
                zone = random.choice([1,2,3,4])
                link = 'www.xxxx.com'
                pic = "pic/j%d.png" % i

                width, height = 300, 400
                bg_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
                image = Image.new("RGB", (width, height), bg_color)
                draw = ImageDraw.Draw(image)
                word = title
                font = ImageFont.truetype("C:\\Users\\de'l'l\\AppData\\Local\\Microsoft\\Windows\\Fonts\\HYChenMeiZiW.ttf", 40)
                text_width, text_height = draw.textsize(word, font=font)
                x = (width - text_width) / 2
                y = (height - text_height) / 4
                draw.text((x, y), word, font=font, fill=(255, 255, 255))
                image.save('../backend/' + pic)

                csvwriter.writerow(
                    {
                        'issn': issn,
                        'title': title,
                        'host': host,
                        'period': period,
                        'inf_factor': inf_factor,
                        'zone': zone,
                        'picture': pic,
                        'link': link
                    }
                )
                i += 1



def get_newspaper():
    title = [
        'xx早报', 'xx日报',
        'xx晨报', 'xx晚报',
        'xx生活报', 'xx都市报'
    ]
    cities = [
        '北京', '上海', '广州', '深圳',
        '苏州', '杭州', '西安', '南京', '武汉'
    ]

    i = 0
    with open('newspaper.csv', 'w+', encoding='utf-8') as file:
        file.write('issn,title,host,city,address,postcode,phone_num,picture,link\n')
        csvwriter = csv.DictWriter(file, ['id', 'issn', 'title', 'authority', 'host', 'city', 'address', 'postcode', 'phone_num', 'picture', 'link'])
        for t in title:
            issn = get_issn()
            authority = 'xx通讯社'
            host = t + '社'
            city = random.choice(cities)
            address = 'xx区xx路x号'
            postcode = 'xxxxxx'
            phone_num = 'xxxx-xxxxxxx'
            link = 'www.xxx.com'
            pic = "pic/n%d.png" % i

            width, height = 300, 400
            bg_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            image = Image.new("RGB", (width, height), bg_color)
            draw = ImageDraw.Draw(image)
            word = t
            font = ImageFont.truetype("C:\\Users\\de'l'l\\AppData\\Local\\Microsoft\\Windows\\Fonts\\HYChenMeiZiW.ttf", 40)
            text_width, text_height = draw.textsize(word, font=font)
            x = (width - text_width) / 2
            y = (height - text_height) / 4
            draw.text((x, y), word, font=font, fill=(255, 255, 255))
            image.save('../backend/' + pic)

            csvwriter.writerow(
                {
                    'issn': issn,
                    'title': t,
                    'authority': authority,
                    'host': host,
                    'city': city,
                    'address': address,
                    'postcode': postcode,
                    'phone_num': phone_num,
                    'picture': pic,
                    'link': link
                }
            )
            i += 1



def get_conf():
    year = ['20' + '%02d' % y for y in range(0, 24)]
    subject = [
        '物理', '化学', '计算机',
        '数学', '心理', '教育',
        '当代文学', '比较文学'
    ]
    places = [
        '北京', '上海', '广州', '深圳',
        '苏州', '杭州', '西安', '南京', '武汉'
    ]

    id = 0
    with open('conf.csv', 'w+', encoding='utf-8') as file:
        file.write('id,name,time,place,association,publisher,publish_date,chief_editor,editors,link\n')
        csvwriter = csv.DictWriter(file, ['id', 'name', 'time', 'place', 'association', 'publisher', 'publish_date', 'chief_editor', 'editors', 'link'])
        for y in year:
            for s in subject:
                name = y + '年' + s + '研讨会'
                time = y + '-%02d-01' % random.randint(1,12)
                place = random.choice(places)
                association = s + '学会'
                publisher = 'xxx 出版社'
                publisher_date = str(int(y) + 1) + '-01-01'
                chief = 'xxxxx'
                editors = 'xxxxx xxxxx xxxxx xxxxx'
                link = 'www.xxx.com'

                csvwriter.writerow(
                    {
                        'id': id,
                        'name': name,
                        'time': time,
                        'place': place,
                        'association': association,
                        'publisher': publisher,
                        'publish_date': publisher_date,
                        'chief_editor': chief,
                        'editors': editors,
                        'link': link
                    }
                )
                id += 1




if __name__ == '__main__':
    get_journals()
    get_newspaper()
    get_conf()

