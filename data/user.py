import csv
import random

def get_college() -> list[str]:
    with open('college.csv', 'r', encoding='utf-8') as file:
        result = csv.reader(file)
        lst = []
        for row in result:
            lst.extend(row)
        lst.pop(0)
        return lst

def get_women_name() -> list[str]:
    with open('name1.csv', 'r', encoding='utf-8') as file:
        result = csv.reader(file)
        lst = []
        for row in result:
            lst.extend(row)
        lst.pop(0)
        return lst

def get_men_name() -> list[str]:
    with open('name2.csv', 'r', encoding='utf-8') as file:
        result = csv.reader(file)
        lst = []
        for row in result:
            lst.extend(row)
        lst.pop(0)
        return lst

def get_passwd() -> str:
    chars = '~!@#$%^&*()_+-=}{|\\[]:;"\'?/<>,.0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    passwd = ''
    for i in range(32):
        passwd += chars[random.randrange(0, len(chars))]
    return passwd

if __name__ == '__main__':
    college = get_college()
    women_name = get_women_name()
    men_name = get_men_name()

    with open('user.csv', 'w+', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(('id', 'type', 'name', 'passwd', 'sex', 'dept'))
        
        for i in range(len(women_name)):
            writer.writerow(
                ('%02d' % (i % 6) + '01' + '%03d' % i,
                '1',
                women_name[i],
                get_passwd(),
                '2',
                college[i % 6]))

        for i in range(len(women_name)):
            writer.writerow(
                ('%02d' % (i % 6) + '01' + '%03d' % (i + 200),
                '1',
                men_name[i],
                get_passwd(),
                '1',
                college[i % 6]))
