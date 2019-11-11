import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GaleriesService } from '../../services/galeries.service';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-gallery-creation-form',
  templateUrl: './gallery-creation-form.component.html',
  styleUrls: ['./gallery-creation-form.component.scss']
})
export class GalleryCreationFormComponent implements OnInit {

  // Create gallery form defined here
  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private galeriesService: GaleriesService) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialize create gallery form
  initForm() {
    this.eventForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      year_slug : ['2019', Validators.required],
      event_slug : 'vap-2019',  //  /!\ Remplacer selon le back défini
      boolPrivate : ['on', Validators.required]
    });
  }

  // Submission of gallery creation
  onSubmitEvent() {
    console.log(this.eventForm);
    this.eventForm.value.private = this.eventForm.value.boolPrivate;
    this.galeriesService.postEvent(this.eventForm.value).subscribe(
      (res) => { alert(Phrases['dashboard.createdGallery']); },
      (error) => { console.error(error); }
    );
  }
}
