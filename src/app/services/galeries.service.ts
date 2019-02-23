import { HttpService } from '../services/http.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleriesService {
  galeries_events :any[];

  event_pics: any[];

  pic : any;

  constructor(private httpService : HttpService,
              private httpClient : HttpClient) {
      // Request to get the list of all public events
      const requestResult = httpService.get2("/api/get-all-galleries")
      .subscribe(
        (res) => {
          this.galeries_events = res["galleries"];
        },
        (error) => { }
      );
    }

  // Get the image associated to some event
  getEventByName(event : string) {
    return this.httpService.post2("/api/get-images/"+event, {"image-slug": event});

  }

  // Get the list of all events
  getAllEvents() {
    return this.httpService.get2("/api/get-all-galleries");
  }

  // Get the list of all private events
  getPrivateEvents() {
    return this.httpService.get2("/api/get-private-galleries");
  }

  // Turn a gallery to private
  makePrivate(slug : string) {
    return this.httpService.post2("/api/galleries/makeprivate", {"gallery_slug" : [slug]});
  }

  // Turn a gallery to public
  makePublic(slug : string) {
    return this.httpService.post2("/api/galleries/makepublic", {"gallery_slug" : [slug]});
  }

  // Get the full picture (not the thumbnail) associated to some path
  getFullImage(path : string){
    return this.httpService.post2("/api/get-full-image", {'file_path' : path});
  }
}
