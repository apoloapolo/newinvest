from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=50)
    email = models.EmailField("email address", unique=True, blank= False, null=False)
    senha = models.CharField(max_length = 100, blank= False, null=False)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return self.nome
