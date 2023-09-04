import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  viewLogin: boolean = true;
  checkboxAdm: boolean = false;
  isLoading: boolean;
  message: string;

  constructor (
    private loginService: LoginService,
    private router: Router
    )
  { }

  ngOnInit(): void {
    if (localStorage.getItem("user") != null) {
      this.router.navigateByUrl('dashboard');
    }
  }

  changeView() {
    this.viewLogin = !this.viewLogin;
    this.message = "";
  }

  login(email: string, senha: string) {
    this.isLoading = true;
    this.loginService.login(email, senha).subscribe(
      user => {
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigateByUrl('dashboard');
      },
      () => {
        this.message = "Erro ao fazer login.";
        this.isLoading = false;
      }
    );
  }

  cadastro(nome: string, email: string, senha: string, is_admin: boolean) {
    this.isLoading = true;
    this.message = "Cadastrando...";
    const user = {
      nome: nome,
      email: email,
      senha: senha,
      is_admin: is_admin
    }
    const next = (): void => {
      this.message = "Cadastro feito com sucesso! Faça login para entrar.";
    }
    const error = (): void => {
      this.message = "Erro ao cadastrar.";
    }
    this.loginService.cadastro(user)
    .subscribe({next, error})
    .add(() => {
      this.isLoading = false;
    });
  }

}
