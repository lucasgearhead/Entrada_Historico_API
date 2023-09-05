from django.urls import path, include
from usuarios.views import UsuarioViewSet, limpar_historico
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('', include(router.urls),),
    path('limpar-historico/', limpar_historico, name='limpar_historico'),
]
