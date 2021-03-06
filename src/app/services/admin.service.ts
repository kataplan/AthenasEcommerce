import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileAdmin } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  server = 'http://localhost:3000/';
  loggedAdmin = false;
  error = '';
  token = '';
  listaUsuarios: Array<ProfileAdmin> = [];
  textoEliminar='';
  constructor(private servicio: HttpClient, private router: Router) { }
  

  obtenerUsuarios() {
    return this.servicio.get(`${this.server}getUsers`).subscribe((response:any)=>{
      this.listaUsuarios=response
    });
  }
  eliminarUsuario(idUsuario:string){
    const objUsuario={
      id:idUsuario
    }
    return this.servicio.post(`${this.server}eliminarUsuario`, objUsuario).subscribe((response:any)=>{
      console.log(response);
    })
  }

  logAdmin(user: any) {
    return this.servicio.post(`${this.server}admin`, user).subscribe(
      (response: any) => {
        if (response.code == 204) {
          this.error = 'Email y/o contraseña erroneos';
        } else {
          this.token = response.token;
          sessionStorage.setItem('admin', this.token);
          window.location.reload();
        }
      },
      (error) => console.log(error)
    );
  }


  verifylogin() {
    if (this.loggedAdmin) {
      window.location.reload()
    } else {
      console.log('false');
    }
  }

  verifyLoggedAdmin(sessionToken: string) {
    this.servicio
      .post(
        `${this.server}api/${sessionStorage.getItem('admin')}`,
        sessionToken
      )
      .subscribe((dato: any) => {
        this.loggedAdmin = dato.loginStatus;
      });
  }
  closeSession(){
    sessionStorage.removeItem('admin');
    window.location.reload();
  }
}
