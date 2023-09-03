from rest_framework import viewsets, filters
from usuario.models import Usuario
from .serializer import UsuarioSerializer
from django_filters.rest_framework import DjangoFilterBackend


class UsuariosViewSet(viewsets.ModelViewSet):
    """Exibindo todos os usuarios"""
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = [ DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['email', 'senha']