import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.sass'],
  providers: [ CookieService ]
})
export class FavoritoComponent implements OnInit {

  public songs: any[];
  public albums: any[];
  public totalAlbums: number;
  public totalSong: number;

  constructor(
    private _CookieService: CookieService
  ){
    this.albums = [];
    this.songs = [];
    this.totalAlbums = 0;
    this.totalSong = 0;
  }

  ngOnInit(): any {
    this.mostrarDatos();
  }

  delete(name:string,tipo:string,artist:string){
    let session: string = this._CookieService.get('session');
    let datos: any = JSON.parse(this._CookieService.get(session));
    let favDatos = datos.fav;
    favDatos.forEach((elemento: any, indice: number) => {
      console.log(`Elemento en el índice ${indice}: ${elemento.tipo}`);
      if((elemento.tipo == tipo) && (elemento.name == name) && (elemento.artist == artist)){
        favDatos.splice(indice, 1);
      }
    });
    this._CookieService.set(session,JSON.stringify(datos));  
    this.albums = [];
    this.songs = [];
    this.mostrarDatos();
  }

  mostrarDatos(){
    let session: string = this._CookieService.get('session');
    let datos: any = JSON.parse(this._CookieService.get(session));
    let favDatos = datos.fav;
    favDatos.forEach((elemento: any, indice: number) => {
      console.log(`Elemento en el índice ${indice}: ${elemento.tipo}`);
      console.log(elemento);
      if (elemento.tipo == 'song') {
        this.songs.push(elemento);
      } else {
        this.albums.push(elemento);
      }
    });
    this.totalAlbums = this.albums.length;
    this.totalSong = this.songs.length;
  }

}
