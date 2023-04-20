import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { httpInterceptorProviders } from './interceptors';
import { BdListComponent } from './components/bd-list/bd-list.component';
import { SingleBdComponent } from './components/bd-list/single-bd/single-bd.component';
import { BdComponent } from './components/bd/bd.component';
import { SerieComponent } from './components/serie/serie.component';
import { AuthorComponent } from './components/author/author.component';
import { CollectionComponent } from './components/collection/collection.component';
import { SearchComponent } from './components/search/search.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedCollectionComponent } from './components/shared-collection/shared-collection.component';
import { SingleBdCollectionComponent } from './components/bd-list/single-bd-collection/single-bd-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    BdListComponent,
    SingleBdComponent,
    BdComponent,
    SerieComponent,
    AuthorComponent,
    CollectionComponent,
    SearchComponent,
    SharedCollectionComponent,
    SingleBdCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
