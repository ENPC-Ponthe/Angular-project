import { Component, OnInit, Input } from '@angular/core';
import { state, trigger, style, transition } from '@angular/animations';
import { saveAs } from 'file-saver';

import { routesAppFromRoot, photosSubpath, videosSubpath } from '../../../Routes';
import { LINKS } from '../../../Constants';
import { GaleriesService } from 'src/app/services/galeries.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';

@Component({
  selector: 'app-galeries-footer',
  templateUrl: './galeries-footer.component.html',
  styleUrls: ['./galeries-footer.component.scss'],
  animations: [
    trigger('footerTrigger', [
      state('visible', style({ opacity: 1, transform: 'translateY(2vh)' })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', []),
    ])
  ]
})
export class GaleriesFooterComponent implements OnInit {
  links = LINKS;
  @Input() nameEvent: string;
  @Input() resumeEvent: string;
  footerState = 'hidden';

  constructor(private galeriesService: GaleriesService,
    public breakpointsService: BreakpointsService) {
  }

  ngOnInit() {
  }

  changeStateFooter() {
    this.footerState = (this.footerState === 'hidden' ? 'visible' : 'hidden');
  }

  getFooterTitleRedirection() {
    const currentUrl = window.location.pathname.split('/');
    const currentGalleryType = currentUrl[currentUrl.length - 2];
    if (currentGalleryType === photosSubpath) {
      return routesAppFromRoot.pics;
    } else if (currentGalleryType === videosSubpath) {
      return routesAppFromRoot.videos;
    }
    return routesAppFromRoot.galeries;
  }

  downloadArchive() {
    const gallerySlug = window.location.pathname.split('/').reverse()[0];
    this.galeriesService.downloadArchive(gallerySlug)
      .subscribe((blob: Blob) => saveAs(blob, `${gallerySlug}.zip`));
  }
}
