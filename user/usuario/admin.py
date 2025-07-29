from django.contrib import admin
from usuario.models import Usuario

class Usuarios(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email', 'telefone', 'is_admin')
    list_display_links = ('nome', 'email')
    search_fields = ('nome', 'telefone')
    list_per_page = 20

admin.site.register(Usuario, Usuarios)