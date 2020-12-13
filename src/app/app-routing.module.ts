import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListImagesComponent} from './gallery/list-images.component';
import {ImageDetailComponent} from './gallery/image-detail.component';
import {AddImageComponent} from './gallery/add-image.component';
import {RouteActivatorService} from './gallery/shared/routeActivator.service';

const routes: Routes = [{path: 'images', component: ListImagesComponent},
  {path: 'images/:id', component: ImageDetailComponent, canActivate: [RouteActivatorService]},
  {path: 'saveImage', component: AddImageComponent, canDeactivate: [`canDeactivatePage`]},
  {path: 'saveImage/:id', component: AddImageComponent, canDeactivate: [`canDeactivatePage`]},
  {path: '' , redirectTo: 'images', pathMatch: 'full'},
  {path: '**', redirectTo: 'images'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
