import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {GalleryService} from './gallery.service';

@Injectable()
export class RouteActivatorService implements CanActivate{
  image: any;
  constructor(private galleryService: GalleryService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean{
    this.galleryService.getImage(+route.params[`id`]).subscribe(data => this.image = data);
    if (!this.image){
      this.router.navigate(['/images']);
    }
    return !!this.image;
  }
}
