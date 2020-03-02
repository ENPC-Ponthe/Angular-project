import { Injectable } from '@angular/core';

import { DEFAULT_PAGE_SIZE } from './galeries.service';
import { HttpService } from './http.service';
import API from './Api';
import { environment } from 'src/environments/environment';
import { Film, FilmData, GetFilmographyResponse, GetVideoCoverImageResponse } from '../types/video.types';

@Injectable()
export class VideoService {
  allFilmography: Film[];
  numberOfMoviesInFilmography: number;

  page: number;
  isLoadingFirstFilmography = false;
  isLoadingMoreFilmography = false;

  selectedMovie: string;
  videoUrl: string;
  coverImageUrl: string;
  movieDetails: FilmData = { name: '', description: '' };
  movieCoverImage: string;

  constructor(private httpService: HttpService) {
    this.initFilmography();
  }

  initFilmography() {
    this.allFilmography = [];
    this.page = 1;
  }

  setSelectedMovie(gallerySlug: string) {
    this.selectedMovie = gallerySlug;
    this.videoUrl = environment.apiUrl + API.getVideo + gallerySlug;
    this.coverImageUrl = environment.apiUrl + API.getVideoCoverImage + gallerySlug;
  }

  getFilmography(page: number) {
    return this.httpService
      .post(API.getFilmography, { page, page_size: DEFAULT_PAGE_SIZE })
      .toPromise();
  }

  loadFirstFilmography() {
    this.initFilmography();
    this.isLoadingFirstFilmography = true;
    this.getFilmography(this.page).then(
      (res: GetFilmographyResponse) => {
        const { number_of_videos, galleries } = res;
        this.numberOfMoviesInFilmography = number_of_videos;
        this.allFilmography = galleries;
        this.isLoadingFirstFilmography = false;
        this.page++;
      },
      error => {
        console.error(error);
      }
    );
  }

  loadMoreFilmography() {
    if (
      !this.isLoadingMoreFilmography &&
      this.page * DEFAULT_PAGE_SIZE < this.numberOfMoviesInFilmography
    ) {
      this.isLoadingMoreFilmography = true;
      this.getFilmography(this.page).then(
        (res: GetFilmographyResponse) => {
          const { galleries } = res;
          this.allFilmography = this.allFilmography.concat(galleries);
          this.isLoadingMoreFilmography = false;
          this.page++;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  getVideoData() {
    this.httpService.post(API.getVideoData, { gallery_slug: this.selectedMovie }).toPromise()
      .then(
        (res: FilmData) => {
          this.movieDetails = res;
        },
        (error) => { console.error(error); }
      );
  }

  getVideoCoverImage() {
    this.httpService.post(API.getVideoCoverImage, { gallery_slug: this.selectedMovie }).toPromise()
      .then(
        (res: GetVideoCoverImageResponse) => {
          const { image } = res;
          this.movieCoverImage = image;
        },
        (error) => { console.error(error); }
      );
  }
}
