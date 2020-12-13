import {Component, OnInit} from '@angular/core';
import {GalleryService} from './shared/gallery.service';
import {Image} from './image';

@Component({
  templateUrl: 'list-images.html'
})
export class ListImagesComponent implements OnInit{
  images: any[];
  filteredImages: any[];
  totalImages = 0;
  pageNumber = 1;
  imagefilter = '';
  get imageFilter(): string{
    return this.imagefilter;
  }
  set imageFilter(value: string){
    this.imagefilter = value;
    this.filteredImages = this.imagefilter ? this.applyFilter(this.imagefilter) : this.images;
  }
  constructor(private galleryService: GalleryService) {
    this.images = [];
    this.filteredImages = [];
  }
  ngOnInit(): void{
    this.galleryService.getImages().subscribe(data => {this.images = data ; this.filteredImages = data; });
    this.totalImages = this.images.length;
  }
  applyFilter(filterBy: string): Image[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.images.filter((image: Image) => image.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
