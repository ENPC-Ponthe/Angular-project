import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BreakpointsService } from 'src/app/services/breakpoints.service';

@Component({
  selector: 'app-subnav-link',
  templateUrl: './subnav-link.component.html',
  styleUrls: ['./subnav-link.component.scss']
})
export class SubnavLinkComponent implements OnInit {

  @Input() route: string;
  @Input() title: string;
  isHovered = false;

  constructor(private router: Router,
              public breakpointsService: BreakpointsService) { }

  ngOnInit() {
  }

  hover() {
    this.isHovered = !this.isHovered;
  }
}
