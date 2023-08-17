import { Component } from '@angular/core';
import { InfoMusicService } from 'src/app/services/InfoMusic.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass'],
  providers: [ InfoMusicService,CookieService ]
})
export class AlbumComponent {

  public album: string;
  public artista: string;
  public cancionesTop: any;
  public informacion: any;
  public totalFav:number;
  public datosFav:any;
  public sinResultados:boolean;
  public init: boolean;

  constructor(
    private _InfoMusicService: InfoMusicService,
    private _CookieService: CookieService
  ){
    this.album = '';
    this.artista = '';
    this.totalFav = 0;
    this.sinResultados = false;
    this.init = true;
  }

  infoAlbum(){

    if((this.artista.replace(/\s+/g, '').length ===0) || (this.album.replace(/\s+/g, '').length ===0)){
      return alert ("Campos vacíos");
    }
    this.init = false;

    if(this._CookieService.get('session')){
      let session: string = this._CookieService.get('session');
      let datos: any = JSON.parse(this._CookieService.get(session));
      this.datosFav = datos.fav;
      this.totalFav = datos.fav.length;
    }
    
    //infoAlbum
    this._InfoMusicService.informacionAlbum(this.artista,this.album).subscribe(
      response => {
        this.sinResultados = false;
        console.log(response.album);
        this.informacion = response.album;
      },
      error => {
        console.log(error);
        this.sinResultados = true;
      }
    )
    //topCancionesAlbum
    this._InfoMusicService.topCancionesAlbum(this.artista,this.album).subscribe(
      response => {
        this.sinResultados = false;
        console.log(response.toptags.tag);
        this.cancionesTop = response.toptags.tag;
      },
      error => {
        console.log(error);
      }
    )

  }

  add(name:string,artist:string){

    if(!this._CookieService.get('session')){
      return alert('debes de estar registrado para esta función');
    }

    let session: string = this._CookieService.get('session');
    let datos = JSON.parse(this._CookieService.get(session));

    datos.fav.push({"name" : name, "artist" : artist,"tipo" : "song", "url" : ""});
    this._CookieService.set(session,JSON.stringify(datos));
    datos= JSON.parse(this._CookieService.get(session));
    this.datosFav = datos.fav;
    this.totalFav = datos.fav.length;
  }

  delete(name:string,artist:string){
    let session: string = this._CookieService.get('session');
    let datos: any = JSON.parse(this._CookieService.get(session));
    let favDatos = datos.fav;
    favDatos.forEach((elemento: any, indice: number) => {
      console.log(`Elemento en el índice ${indice}: ${elemento.tipo}`);
      if((elemento.tipo == 'song') && (elemento.name == name) && (elemento.artist == artist)){
        favDatos.splice(indice, 1);
      }
    });
    this._CookieService.set(session,JSON.stringify(datos));
    datos= JSON.parse(this._CookieService.get(session));
    this.datosFav = datos.fav;
    this.totalFav = datos.fav.length;
  }

  //manejo de mostrar los fav
  esFav(song:string){
    let valor: boolean = false;
    this.datosFav.forEach((elemento: any, indice: number) => {
      if(elemento.name === song){
        valor = true;
      }
    });
    return valor;
  }
  noFav(song:string){
    let valor: boolean = true;
    this.datosFav.forEach((elemento: any, indice: number) => {
      if(elemento.name === song){
        valor = false;
      }
    });
    return valor;
  }
  //manejo de fav fin

}
