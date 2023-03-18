from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import User, Researcher


class UserAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class ResearcherAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)
admin.site.register(Researcher, ResearcherAdmin)
