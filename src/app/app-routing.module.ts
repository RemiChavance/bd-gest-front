import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './components/author/author.component';
import { BdComponent } from './components/bd/bd.component';
import { CollectionComponent } from './components/collection/collection.component';
import { HomeComponent } from './components/home/home.component';
import { SerieComponent } from './components/serie/serie.component';
import { SharedCollectionComponent } from './components/shared-collection/shared-collection.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'bd/:isbn', component: BdComponent},
  { path: 'serie/:id', component: SerieComponent},
  { path: 'author/:id', component: AuthorComponent},
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuard] },
  { path: 'shared-collection/:id', component: SharedCollectionComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
