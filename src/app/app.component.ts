import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ CookieService ]
})
export class AppComponent implements OnInit {
  title = 'aplicacion-musica';
  public session: boolean;
  public cssUrl: string;
  public urlImg: string;
  public backgroundColor:string;
  public ulrImgNota: string;
  constructor(
    private _CookieService: CookieService,
    private _router: Router,
    public sanitizer: DomSanitizer
  ){
    this.session = false;
    //this.cssUrl = '/assets/styles-white.css';
    this.cssUrl = 'styles.css';
    this.urlImg="https://img.icons8.com/color/25/music-record--v1.png";
    this.backgroundColor ="#F92548";
    this.ulrImgNota ='https://img.icons8.com/color/80/musical-notes.png';
  }

  ngOnInit(): void {
  }

  logout(){
    this._CookieService.delete('session');
    this._router.navigate(['/Inicio']);

  }

  //control session
  sessionValidate(){
    if(this._CookieService.get('session')){
      return true;
    }
    return false;
  }

  changeStyle(){

    if(this.cssUrl === 'styles.css'){
      this.cssUrl = "/assets/styles-white.css";
      this.urlImg="https://img.icons8.com/ios-filled/25/music-record.png";
      this.backgroundColor ="#FF5722";
      this.ulrImgNota ='https://img.icons8.com/metro/80/musical-notes.png';
    }else{
      this.cssUrl = "styles.css";
      this.urlImg="https://img.icons8.com/color/25/music-record--v1.png";
      this.backgroundColor ="#F92548";
      this.ulrImgNota ='https://img.icons8.com/color/80/musical-notes.png';
    }
  }
}
