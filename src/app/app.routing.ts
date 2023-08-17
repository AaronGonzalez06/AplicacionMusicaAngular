import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InicioComponent } from "./components/inicio/inicio.component";
import { ArtistaComponent } from "./components/artista/artista.component";
import { AlbumComponent } from "./components/album/album.component";
import { LoginComponent } from "./components/login/login.component";
import { FavoritoComponent } from "./components/favorito/favorito.component";
const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'Inicio', component: InicioComponent},
    {path: 'Artista', component: ArtistaComponent},
    {path: 'Album', component: AlbumComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'Favorito', component: FavoritoComponent},
    {path: '**', component: InicioComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);