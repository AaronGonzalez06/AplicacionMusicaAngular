import { Component } from '@angular/core';
import { InfoMusicService } from 'src/app/services/InfoMusic.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.sass'],
  providers: [ InfoMusicService,CookieService ]
})
export class ArtistaComponent {
  public artista: string;
  public albums: any;
  public musicArtist: any;
  public informacionArtista: any;
  public totalFav:number;
  public datosFav:any;
  public sinResultados: boolean;
  public init: boolean;

  constructor(
    private _InfoMusicService: InfoMusicService,
    private _CookieService: CookieService
  ){
    this.artista = '';
    this.totalFav = 0;
    this.sinResultados = false;
    this.init = true;
  }

  infoArtista(nombre:string | null = null){

    if(this.artista.replace(/\s+/g, '').length ===0){
      return alert ("Campo vacío");
    }

    if(!nombre){
      this.init = false;
      nombre = this.artista;
      console.log("🚀 ~ file: artista.component.ts:30 ~ ArtistaComponent ~ infoArtista ~ nombre:", nombre)
    }else{      
      this.init = false;
      this.artista = nombre;
      console.log("🚀 ~ file: artista.component.ts:33 ~ ArtistaComponent ~ infoArtista ~ this.artista:", this.artista)
    }
    //datos fav user
    if(this._CookieService.get('session')){
      let session: string = this._CookieService.get('session');
      let datos: any = JSON.parse(this._CookieService.get(session));
      this.datosFav = datos.fav;
      this.totalFav = datos.fav.length;
    }
    //info
    this._InfoMusicService.infoArtista(nombre).subscribe(
      response => {
        if(response.error){
          this.sinResultados = true;
        }else{
          this.sinResultados = false;
        }
        console.log(response.artist);
        this.informacionArtista = response.artist;
      },
      error => {
        console.log(error);
      }
    )
    //album
    this._InfoMusicService.infoArtistaAlbunes(nombre).subscribe(
      response => {
        console.log(response.topalbums.album);
        this.albums = response.topalbums.album;
      },
      error => {
        console.log(error);
      }
    )
    //topmusica
    this._InfoMusicService.mejoresCancionesArtista(nombre).subscribe(
      response => {
        console.log(response);
        this.musicArtist = response.toptracks.track;
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
    //prueba
    datos= JSON.parse(this._CookieService.get(session));
    this.datosFav = datos.fav;
    this.totalFav = datos.fav.length;
  }

  addAlbum(name:string,artist:string,url:string){

    if(!this._CookieService.get('session')){
      return alert('debes de estar registrado para esta función');
    }

    let session: string = this._CookieService.get('session');
    let datos = JSON.parse(this._CookieService.get(session));

    datos.fav.push({"name" : name, "artist" : artist,"tipo" : "album", "url" : url});
    
    console.log("🚀 ~ file: artista.component.ts:90 ~ ArtistaComponent ~ addAlbum ~ datos:", datos)
    this._CookieService.set(session,JSON.stringify(datos));
    //prueba
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
    //prueba
    datos= JSON.parse(this._CookieService.get(session));
    this.datosFav = datos.fav;
    this.totalFav = datos.fav.length;
  }

  deleteAlbum(name:string,artist:string){
    console.log("borrar album");
    let session: string = this._CookieService.get('session');
    let datos = JSON.parse(this._CookieService.get(session));
    let favDatos = datos.fav;
    console.log("🚀 ~ file: artista.component.ts:120 ~ ArtistaComponent ~ deleteAlbum ~ favDatos:", favDatos)
    favDatos.forEach((elemento: any, indice: number) => {
      console.log(`Elemento en el índice ${indice}: ${elemento.tipo}`);
      if((elemento.tipo == 'album') && (elemento.name == name) && (elemento.artist == artist)){
        favDatos.splice(indice, 1);
      }
    });
    this._CookieService.set(session,JSON.stringify(datos));
    console.log("🚀 ~ file: artista.component.ts:126 ~ ArtistaComponent ~ deleteAlbum ~ datos:", datos)
    //prueba
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
