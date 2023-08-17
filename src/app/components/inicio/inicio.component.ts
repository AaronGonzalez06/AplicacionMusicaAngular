import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InfoMusicService } from 'src/app/services/InfoMusic.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass'],
  providers: [ InfoMusicService,CookieService ]
})
export class InicioComponent implements OnInit {

  public infoMusica: any;
  public musica: any;
  public datosFav:any;
  public totalFav:number;
  public cambio: boolean;
  public FavSong:boolean;

  constructor(
    private _InfoMusicService: InfoMusicService,
    private _CookieService: CookieService
  ){
    this.totalFav = 0;
    this.cambio= false;
    this.FavSong = false;
  }

  ngOnInit(): any {

    if(this._CookieService.get('session')){
      let session: string = this._CookieService.get('session');
      let datos: any = JSON.parse(this._CookieService.get(session));
      this.datosFav = datos.fav;
      this.totalFav = datos.fav.length;
    }
    console.log("🚀 ~ file: inicio.component.ts:32 ~ InicioComponent ~ ngOnInit ~ this.datosFav:", this.datosFav)

    this._InfoMusicService.showArtistsTop().subscribe(
      response => {
        console.log(response.artists.artist);
        this.infoMusica = response.artists.artist;
      },
      error => {
        console.log(error);
      }
    )

    this._InfoMusicService.showMusicTop('spain').subscribe(
      response =>{
        console.log(response.tracks.track);
        this.musica = response.tracks.track;
      },
      error =>{
        console.log(error);
      }
    )
  }

  topMusic(pais: string){
    this._InfoMusicService.showMusicTop(pais).subscribe(
      response =>{
        console.log(response.tracks.track);
        this.musica = response.tracks.track;
      },
      error =>{
        console.log(error);
      }
    )
  }

  add(name:string,artist:string){
    if(this._CookieService.get('session')){
      let session: string = this._CookieService.get('session');
      let datos = JSON.parse(this._CookieService.get(session));

      datos.fav.push({"name" : name, "artist" : artist,"tipo" : "song", "url" : ""});
      console.log("🚀 ~ file: login.component.ts:83 ~ LoginComponent ~ login ~ datos.fav:", datos.fav)
      this._CookieService.set(session,JSON.stringify(datos));
      //prueba
      datos= JSON.parse(this._CookieService.get(session));
      this.datosFav = datos.fav;
      this.totalFav = datos.fav.length;
    }else{
      alert('debes de estar registrado para esta función');
    }
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
