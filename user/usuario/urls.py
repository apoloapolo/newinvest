from django.urls import path, include
from rest_framework import routers
from .views import (
    UsuariosViewSet,
    UsuarioPorEmailView,
    UsuarioPorEmailViewTodos,
    LoginUsuarioView
)

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

schema_view = get_schema_view(
   openapi.Info(
      title="User API",
      default_version='v1',
      description="API de Usuarios",
      terms_of_service="#",
      contact=openapi.Contact(email="vini@gmail.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register('usuario', UsuariosViewSet, basename='Usuarios')
router.register('usuarioList', UsuarioPorEmailViewTodos, basename='UsuariosEmail')

urlpatterns = [
    path('', include(router.urls)),

    # 🔐 JWT: obtenção e renovação de tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # POST com email e senha
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # POST com refresh token

    # ✅ Rota personalizada: buscar por email
    path('usuario/<str:email>/', UsuarioPorEmailView.as_view(), name='usuario-por-email'),

    # ✅ Rota personalizada: login via POST (sem JWT, se ainda quiser manter)
    path('usuario/login/', LoginUsuarioView.as_view(), name='usuario-login'),

    # 🔍 Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
