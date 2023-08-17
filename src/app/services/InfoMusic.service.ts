import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class InfoMusicService {
    constructor(
        public _http: HttpClient
    ){
    }

    //Inicio

    showArtistsTop():Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=9bffefb4472ee9c471e1675876454efe', { headers: headers });    
    }

    showMusicTop(pais:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get('https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+ pais +'&api_key=9bffefb4472ee9c471e1675876454efe&format=json', { headers: headers });    
    }

    //Artista

    infoArtista(artista: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artista+'&api_key=9bffefb4472ee9c471e1675876454efe&format=json', { headers: headers });    
    }

    infoArtistaAlbunes(artista: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        //return this._http.get('https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+ artista +'&api_key=9bffefb4472ee9c471e1675876454efe&format=json', { headers: headers });            
        return this._http.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+artista+'&api_key=9bffefb4472ee9c471e1675876454efe&format=json', { headers: headers });    
    }

    mejoresCancionesArtista(artista: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist='+ artista +'&api_key=9bffefb4472ee9c471e1675876454efe&format=json', { headers: headers });    
    }

    //álbunes

    informacionAlbum(artista: string,album: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9bffefb4472ee9c471e1675876454efe&artist='+artista+'&album='+album+'&format=json', { headers: headers });    
    }

    topCancionesAlbum(artista: string,album: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get('http://ws.audioscrobbler.com/2.0/?method=album.gettoptags&artist='+artista+'&album='+album+'&api_key=9bffefb4472ee9c471e1675876454efe&format=json', { headers: headers });    
    }

}
