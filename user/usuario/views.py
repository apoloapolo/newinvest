from rest_framework import viewsets
from usuario.models import Usuario
from .serializer import UsuarioSerializer


class UsuariosViewSet(viewsets.ModelViewSet):
    """Exibindo todos os usuarios"""
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer