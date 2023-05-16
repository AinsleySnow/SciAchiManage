from import_export.admin import ImportExportModelAdmin
from import_export import resources
from django.contrib import admin
from . import models

class UserAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class ResearcherAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class CollegeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class JournalResource(resources.ModelResource):
    class Meta:
        model = models.Journal
        import_id_fields = ('issn',)

class JournalAdmin(ImportExportModelAdmin):
    resource_class = JournalResource


class PaperAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class PrizeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class NewspaperResource(resources.ModelResource):
    class Meta:
        model = models.Newspaper
        import_id_fields = ('issn',)

class NewspaperAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = NewspaperResource


class ArticleAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class ConferenceAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class ConferencePaperAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass


class BookResource(resources.ModelResource):
    class Meta:
        model = models.Book
        import_id_fields = ('isbn',)

class BookAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = BookResource


class PatentResource(resources.ModelResource):
    class Meta:
        model = models.Patent
        import_id_fields = ('patent_num',)

class PatentAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = PatentResource


class PaperAuthorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class NewspaperAuthorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class ConfAuthorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class BookAuthorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class PrizeAuthorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class PatentAuthorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Researcher, ResearcherAdmin)
admin.site.register(models.College, CollegeAdmin)
admin.site.register(models.Journal, JournalAdmin)
admin.site.register(models.Paper, PaperAdmin)
admin.site.register(models.Newspaper, NewspaperAdmin)
admin.site.register(models.Article, ArticleAdmin)
admin.site.register(models.Conference, ConferenceAdmin)
admin.site.register(models.ConferencePaper, ConferencePaperAdmin)
admin.site.register(models.Book, BookAdmin)
admin.site.register(models.Patent, PatentAdmin)
admin.site.register(models.Prize, PrizeAuthorAdmin)
admin.site.register(models.PaperAuthor, PaperAuthorAdmin)
admin.site.register(models.NewspaperAuthor, NewspaperAuthorAdmin)
admin.site.register(models.ConferenceAuthor, ConfAuthorAdmin)
admin.site.register(models.BookAuthor, BookAuthorAdmin)
admin.site.register(models.PrizeAuthor, PrizeAuthorAdmin)
admin.site.register(models.PatentAuthor, PatentAuthorAdmin)
