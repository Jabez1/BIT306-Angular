import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public loginService: LoginService){}

  login(form : NgForm){
    console.log(form.value.empID, form.value.password);
    if(form.invalid){
      return;
    } else
    this.loginService.login(form.value.empID, form.value.password);
  }
}
