from rest_framework import viewsets
from usuario.models import Usuario
from .serializer import UsuarioSerializer
from rest_framework.decorators import action



class UsuariosViewSet(viewsets.ModelViewSet):
    """Exibindo todos os usuarios"""
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['get'])
    def filtrar_por_parametros(self, request):
        parametro1 = self.request.query_params.get('parametro1')
        parametro2 = self.request.query_params.get('parametro2')

        # Realize a consulta no banco de dados com base nos parâmetros
        if parametro1 and parametro2:
            usuarios = Usuario.objects.filter(email=parametro1, senha=parametro2)
            serializer = self.get_serializer(usuarios, many=True)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Parâmetros "parametro1" e "parametro2" são obrigatórios.'}, status=400)