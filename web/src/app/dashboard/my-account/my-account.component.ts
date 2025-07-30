import { Component, OnInit } from '@angular/core';
import User from 'src/app/shared/models/user-model';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: User;
  messageUpdateUser: string;
  isLoading: boolean;
  viewDeletarConta: boolean;
  emailInvalido: boolean = false;
  telefone: string = '';
  telefoneInvalido: boolean = false;
  telefoneNumerico: string = '';

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    const somenteNumeros = this.user.telefone.slice(2);
    this.telefone = `(${somenteNumeros.slice(0, 2)})${somenteNumeros.slice(2, 7)}-${somenteNumeros.slice(7)}`;
    this.telefoneNumerico = somenteNumeros;
  }

  validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = !regex.test(email);
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

  isFormValid(nome: string, email: string): boolean {
    return (
      nome.trim() !== '' &&
      email.trim() !== '' &&
      !this.emailInvalido &&
      !this.telefoneInvalido
    )
  }

  updateUser(nome: string, email: string) {
    this.isLoading = true;
    const user = {
      nome: nome,
      email: email,
      telefone: '55' + this.telefoneNumerico,
    }
    this.dashboardService.updateUser(this.user.id, user).subscribe({
      next: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.user = user;
        this.messageUpdateUser = "Dados atualizados com sucesso!";
      },
      error: () => {
        this.messageUpdateUser = "Erro ao atualizar os dados.";
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteUser(id: number) {
    this.isLoading = true;
    const next = (): void => {
      this.isLoading = false;
      this.sair();
    }
    const error = (): void => {
      this.messageUpdateUser = "Erro ao excluir a conta.";
      this.isLoading = false;
    }
    this.dashboardService.deleteUser(id)
      .subscribe({ next, error })
  }

  sair() {
    localStorage.removeItem("user");
    this.router.navigateByUrl('');
  }

}
