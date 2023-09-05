from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


def limpar_historico(request):
    if request.method == 'DELETE':
        Usuario.objects.all().delete()
        return Response({'message': 'Histórico limpo com sucesso'}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({'message': 'Método não permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)