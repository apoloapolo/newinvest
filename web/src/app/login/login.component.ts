import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  viewLogin: boolean = false;
  isLoading: boolean;
  message: string;
  senhaInvalida: boolean = false;
  senhasDiferentes: boolean = false;
  emailInvalido: boolean = false;
  captchaToken: string = null;
  telefone: string = '';
  telefoneInvalido: boolean = false;
  telefoneNumerico: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

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
    this.loginService.login(email, senha).subscribe({
      next: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigateByUrl('dashboard');
      },
      error: () => {
        this.message = "Erro ao fazer login.";
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  cadastro(nome: string, email: string, senha: string) {
    this.isLoading = true;
    this.message = "Cadastrando...";
    const user = {
      nome: nome,
      email: email,
      password: senha,
      telefone: '55' + this.telefoneNumerico,
    }
    const next = (): void => {
      this.message = "Cadastro feito com sucesso! Faça login para entrar.";
    }
    const error = (): void => {
      this.message = "Erro ao cadastrar.";
    }
    this.loginService.cadastro(user)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }


  onTelefoneInput(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    this.telefoneNumerico = input;
    this.telefoneInvalido = input.length < 11;

    if (input.length > 7) {
      this.telefone = `(${input.slice(0, 2)})${input.slice(2, 7)}-${input.slice(7)}`;
    } else if (input.length > 2) {
      this.telefone = `(${input.slice(0, 2)})${input.slice(2)}`;
    } else {
      this.telefone = input;
    }
  }

  permitirApenasNumeros(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  handleCaptcha(token: string) {
    this.captchaToken = token;
  }

  validatePassword(senha: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    this.senhaInvalida = !regex.test(senha);
  }

  checkSenhas(senha: string, confirmacao: string) {
    this.senhasDiferentes = confirmacao.trim() === '' || senha !== confirmacao;
  }

  validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = !regex.test(email);
  }

  isFormValid(nome: string, email: string, senha: string): boolean {
    return (
      nome.trim() !== '' &&
      email.trim() !== '' &&
      senha.trim() !== '' &&
      !this.emailInvalido &&
      !this.telefoneInvalido &&
      !this.senhaInvalida &&
      !this.senhasDiferentes &&
      this.captchaToken !== null
    )
  }

}
