from django.contrib import admin
from usuario.models import Usuario

class Usuarios(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email' , 'senha', 'is_admin')
    list_display_links = ('nome', 'email')
    search_fields = ('nome',)
    list_per_page = 20

admin.site.register(Usuario, Usuarios)

# Register your models here.
