import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './nav/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ListImagesComponent} from './gallery/list-images.component';
import {GalleryService} from './gallery/shared/gallery.service';
import {AlbumService} from './gallery/shared/album.service';
import {HttpClientModule} from '@angular/common/http';
import {ImageDetailComponent} from './gallery/image-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddImageComponent} from './gallery/add-image.component';
import {RouteActivatorService} from './gallery/shared/routeActivator.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListImagesComponent,
    ImageDetailComponent,
    AddImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GalleryService, RouteActivatorService, AlbumService,
    {provide: `canDeactivatePage`, useValue: checkDirtyState}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component: AddImageComponent): boolean{
  if (component.isFormDirty()){
    return window.confirm(`You have not saved the changes, are you sure you want to exit this page?`);
  }
  return true;
}
