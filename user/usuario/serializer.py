from rest_framework import serializers
from usuario.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # campo para receber senha

    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'telefone', 'password', 'is_admin', 'is_staff', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()  # muito importante salvar aqui
        return usuario

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class UsuarioSerializerEmail(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nome', 'email', 'telefone']