from rest_framework import viewsets, filters
from usuario.models import Usuario
from .serializer import UsuarioSerializer, UsuarioSerializerEmail
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics


class UsuariosViewSet(viewsets.ModelViewSet):
    """Exibindo todos os usuarios"""
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = [ DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['email', 'senha']

class UsuarioPorEmailView(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'email'

class UsuarioPorEmailSenhaView(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'email'

    def get_object(self):
        email = self.kwargs['email']
        senha = self.kwargs['senha']
        return self.queryset.get(email=email, senha=senha)

class UsuarioPorEmailViewTodos(viewsets.ModelViewSet):
    """Exibindo todos os usuarios"""
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializerEmail
