from rest_framework import viewsets, filters, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action  # Import necessário para @action
from rest_framework.exceptions import NotFound
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import RetrieveAPIView

from usuario.models import Usuario
from .serializer import UsuarioSerializer, UsuarioSerializerEmail


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['email']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=True, methods=["post"], url_path="trocar-senha")
    def trocar_senha(self, request, pk=None):
        usuario = self.get_object()
        senha_atual = request.data.get("senha_atual")
        nova_senha = request.data.get("nova_senha")

        if not senha_atual or not nova_senha:
            return Response({"erro": "Envie senha_atual e nova_senha."},
                            status=status.HTTP_400_BAD_REQUEST)

        if not usuario.check_password(senha_atual):
            return Response({"erro": "Senha atual incorreta."},
                            status=status.HTTP_400_BAD_REQUEST)

        usuario.set_password(nova_senha)
        usuario.save()
        return Response({"mensagem": "Senha alterada com sucesso."})

class UsuarioPorEmailView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'email'
    permission_classes = [IsAuthenticated]  # Ou [AllowAny] se quiser deixar público


class LoginUsuarioView(APIView):
    """
    View segura para login do usuário com email e senha via POST
    """
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        senha = request.data.get('senha')

        if not email or not senha:
            return Response({'erro': 'Email e senha são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({'erro': 'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        if not usuario.check_password(senha):
            return Response({'erro': 'Senha incorreta.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UsuarioPorEmailViewTodos(viewsets.ModelViewSet):
    """Exibindo todos os usuarios"""
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializerEmail
