import csv


name_id = dict()
with open('user.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['id'][2:4] == '01':
            name_id[row['name']] = row['id']


def get_paperauthor():
    with open('paper_author.csv', 'w+', encoding='utf-8') as result:
        result.write('id,applicant,pid,status\n')
        writer = csv.DictWriter(result, ['id', 'applicant', 'pid', 'status'])

        with open('paper.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            i = 0
            for row in reader:
                id = name_id[(row['author'].split('，'))[0]]
                pid = row['id']
                status = 1

                writer.writerow({
                    'id': i,
                    'applicant': id,
                    'pid': pid,
                    'status': status
                })
                i += 1


def get_newspaperauthor():
    with open('newspaper_author.csv', 'w+', encoding='utf-8') as result:
        result.write('id,applicant,aid,status\n')
        writer = csv.DictWriter(result, ['id', 'applicant', 'aid', 'status'])

        with open('article.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            i = 0
            for row in reader:
                id = name_id[(row['author'].split('，'))[0]]
                aid = row['id']
                status = 1

                writer.writerow({
                    'id': i,
                    'applicant': id,
                    'aid': aid,
                    'status': status
                })
                i += 1


def get_conferenceauthor():
    with open('conference_author.csv', 'w+', encoding='utf-8') as result:
        result.write('id,applicant,cpid,status\n')
        writer = csv.DictWriter(result, ['id', 'applicant', 'cpid', 'status'])

        with open('confpaper.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            i = 0
            for row in reader:
                id = name_id[(row['author'].split('，'))[0]]
                cpid = row['id']
                status = 1

                writer.writerow({
                    'id': i,
                    'applicant': id,
                    'cpid': cpid,
                    'status': status
                })
                i += 1


def get_bookauthor():
    with open('book_author.csv', 'w+', encoding='utf-8') as result:
        result.write('id,applicant,isbn,status\n')
        writer = csv.DictWriter(result, ['id', 'applicant', 'isbn', 'status'])

        with open('book.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            i = 0
            for row in reader:
                id = name_id[(row['author'].split('，'))[0]]
                bid = row['isbn']
                status = 1

                writer.writerow({
                    'id': i,
                    'applicant': id,
                    'isbn': bid,
                    'status': status
                })
                i += 1


def get_patentauthor():
    with open('patent_author.csv', 'w+', encoding='utf-8') as result:
        result.write('id,applicant,patent_num,status\n')
        writer = csv.DictWriter(result, ['id', 'applicant', 'patent_num', 'status'])

        with open('patent.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            i = 0
            for row in reader:
                id = name_id[(row['applyer'].split('，'))[0]]
                patentid = row['patent_num']
                status = 1

                writer.writerow({
                    'id': i,
                    'applicant': id,
                    'patent_num': patentid,
                    'status': status
                })
                i += 1


if __name__ == '__main__':
    get_paperauthor()
    get_newspaperauthor()
    get_conferenceauthor()
    get_bookauthor()
    get_patentauthor()
