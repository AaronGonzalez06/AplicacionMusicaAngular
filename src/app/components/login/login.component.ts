import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [ CookieService ]
})
export class LoginComponent implements OnInit {

  public email:string;
  public passwd:string;
  public emailRegister:string;
  public passwdRegister:string;
  public passwdVerifiRegister:string;
  constructor(
    private _CookieService: CookieService,
    private _router: Router
  ){
    this.email ='';
    this.passwd ='';
    this.emailRegister ='';
    this.passwdRegister ='';
    this.passwdVerifiRegister ='';
  }

  ngOnInit(): any {
    if(!this._CookieService.get('users')){
      let users = {
        "users": []
      };
      this._CookieService.set('users',JSON.stringify(users));
    }
    let datos = JSON.parse(this._CookieService.get('users'));
    console.log("🚀 ~ file: login.component.ts:35 ~ LoginComponent ~ ngOnInit ~ datos:", datos);
  }

  register(){

    //validaciones
    if((this.passwdVerifiRegister.replace(/\s+/g, '').length ===0) || (this.passwdRegister.replace(/\s+/g, '').length ===0) || (this.emailRegister.replace(/\s+/g, '').length ===0)){
      return alert ("Campos vacíos");
    }

    if(!this.validarEmail(this.emailRegister)){
      return alert("email no valido");
    }

    if(this._CookieService.get(this.emailRegister)){
      return alert("Este email ya esta registrado");
    }
    //fin validaciones

    if(this.passwdVerifiRegister === this.passwdRegister){

      //añadir nuevo usuario
      let data =JSON.parse(this._CookieService.get('users') ?? '[]');
      let users = data.users;
      users.push('{"email" : "'+this.emailRegister+'", "passwd" : "'+this.passwdRegister+'"}');
      this._CookieService.set('users',JSON.stringify(data));

      let fav = {
        "fav": []
      };
      this._CookieService.set(this.emailRegister,JSON.stringify(fav));
      if(!this._CookieService.get('session')){
        this._CookieService.set('session',this.emailRegister);
      }

      this._router.navigate(['/Favorito']);

    }else{
      alert("contraseña no coinciden");
    }

  }

  login(){
    let email: string = this.email.replace(/\s+/g, '');
    let passwd: string = this.passwd.replace(/\s+/g, '');
    let login: boolean = false;
    let posicion: number = 0;

    if((email.length  === 0) ||(passwd.length  === 0)){
      return alert("Campos vacío");
    }

      let data = JSON.parse(this._CookieService.get('users'));
      data.users.forEach(function(elemento:any, indice:number) {
      let parseado = JSON.parse(elemento);
      console.log(`Elemento en el índice ${indice}: ${parseado.email}`);
      if((parseado.email === email) && (parseado.passwd === passwd)){
        login = true;
        posicion = indice;
      }
      });
      if(login){

        if(!this._CookieService.get('session')){
          this._CookieService.set('session',email);
        }

        this._router.navigate(['/Favorito']);
      }else{
        alert("Datos incorrecto");
      }
    
  }

  validarEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }
}