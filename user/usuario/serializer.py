from rest_framework import serializers
from usuario.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class UsuarioSerializerEmail(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nome', 'email']