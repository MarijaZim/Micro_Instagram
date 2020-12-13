import {Component, OnInit} from '@angular/core';
import {GalleryService} from './shared/gallery.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService} from './shared/album.service';
import {Image} from './image';

@Component({
  templateUrl: 'image-details.html'
})
export class ImageDetailComponent implements OnInit{
  image: any;
  album: any;
  constructor(private galleryService: GalleryService, private route: ActivatedRoute,
              private router: Router, private albumService: AlbumService) {
  }
  ngOnInit(): void{
    this.galleryService.getImage(+this.route.snapshot.params[`id`]).subscribe(data => {
      this.image = data;
      this.findAlbumTitle(this.image);
    });
  }
  findAlbumTitle(image: Image): void{
    this.albumService.getAlbum(image.albumId).subscribe(data => this.album = data);
  }
  deleteImage(): void{
    if (confirm('Are you sure you want to delete this image?')){
      this.galleryService.deleteImage(this.image.id).subscribe({
        next: () => this.onSaveComplete()
      });
    }
  }
  onSaveComplete(): void{
    this.router.navigate(['/images']);
  }
}
