import csv
import random

position = ['讲师', '副教授', '教授']
university = [
    '北京大学', '清华大学', '同济大学', '上海交通大学', '华东师范大学', '复旦大学',
    '南京大学', '东南大学', '武汉大学', '华中科技大学', '华中师范大学', '北京航空航天大学', '国防科技大学',
    '中国人民大学', '北京交通大学', '北京化工大学', '苏州大学', '北京师范大学', '北京理工大学',
    '中山大学', '华南师范大学', '华南理工大学', '哈佛大学', '加州大学伯克利分校', '加州大学圣迭戈分校',
    '牛津大学', '剑桥大学', '德州农工大学', '纽约大学', '明尼苏达州立大学', '斯坦福大学', '卡内基-梅隆大学']

def get_profile():
    profile = '本科毕业于' + random.choice(university)
    profile += '，研究生毕业于' + random.choice(university)
    profile += '，博士毕业于' + random.choice(university)
    return profile

work = [
    '基于 xxx 的 xxx', 'xxx 在 xxx 中的应用', '论 xxx', 'xxx 刍议',
    'xxx 应用刍议', '浅析 xxx', 'xxx 在 xxx 中起到了重大作用',
    'xxx faclitate xxx in xxx', 'xxx improves xxx when xxx is on' ]

def get_work():
    mywork = ''
    for i in range(random.randint(5, 10)):
        mywork += random.choice(work) + '，'
    return mywork

if __name__ == '__main__':
    result = open('researcher.csv', 'w+', encoding='utf-8')
    result.write('id,rid,dept,position,profile,work,photo\n')
    write_result = csv.DictWriter(result, ['id', 'rid', 'dept', 'position', 'profile', 'work', 'photo'])

    with open('user.csv', 'r', encoding='utf-8') as file:
        i = 0
        reader = csv.DictReader(file)
        for row in reader:
            rid = row['id']
            dept = row['dept']
            write_result.writerow(
                {
                    'id': i,
                    'rid': rid,
                    'dept': dept,
                    'position': random.choice(position),
                    'profile': get_profile(),
                    'work': get_work(),
                    'photo': None
                }
            )
            i += 1
