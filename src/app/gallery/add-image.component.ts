import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Image} from './image';
import {GalleryService} from './shared/gallery.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService} from './shared/album.service';

@Component({
  templateUrl: 'addImage.html'
})
export class AddImageComponent implements OnInit{
  addImageForm: any;
  albums: any;
  image: any;
  imageId: any;
  forSaving = false;
  forEdit = false;
  pageTitle = 'Add new image';
  private sub: any = null ;
  constructor(private galleryService: GalleryService , private router: Router, private route: ActivatedRoute,
              private albumService: AlbumService) {
    this.addImageForm = null;
    this.imageId = '';
    this.albums = [];
  }

  ngOnInit(): void {
    this.addImageForm = new FormGroup({
      albumId: new FormControl(),
      id: new FormControl(),
      title: new FormControl(),
      url: new FormControl(),
      thumbnailUrl: new FormControl()
    });
    this.albumService.getAlbums().subscribe(data => this.albums = data);
    this.sub = this.route.paramMap.subscribe(
      params => {
        this.imageId = params.get('id');
        this.imageId !== null ? this.getImage(+this.imageId)  : console.log();
      });
    if (this.imageId){
      this.forEdit = true;
    }
  }
  getImage(id: number): void {
    this.galleryService.getImage(id)
      .subscribe({
        next: (image: Image) => {this.displayImage(image); },
      });
  }
  displayImage(image: Image): void{
       if (this.addImageForm){
         this.addImageForm.reset();
       }
       this.image = image;
       this.pageTitle = `Edit image`;
       this.addImageForm.patchValue({
        title: this.image.title,
        id: this.image.id,
        albumId: this.image.albumId,
        url: this.image.url,
        thumbnailUrl: this.image.thumbnailUrl
      });
    }
  save(): void{
    if ( this.addImageForm.valid){
      const i = {...this.image , ...this.addImageForm.value};
      if (this.forEdit){
        this.galleryService.updateImage(i).subscribe({
          next: () => this.onSaveComplete(),
        });
      }
      else {
        this.galleryService.addImage(i).subscribe({
          next: () => this.onSaveComplete(),
        });
      }
    }
  }
  onSaveComplete(): void{
    this.forSaving = true;
    this.forEdit = false;
    this.router.navigate(['/images']);
  }
  isFormDirty(): boolean{
    if (this.forSaving){
      return false;
    }
    return this.addImageForm.dirty;
  }
}


