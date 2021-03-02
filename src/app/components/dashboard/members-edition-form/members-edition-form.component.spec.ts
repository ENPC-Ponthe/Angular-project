import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GaleriesService } from '../../../services/galeries.service';
import { HttpService } from '../../../services/http.service';
import { MembersEditionFormComponent } from './members-edition-form.component';

describe('GalleryCreationFormComponent', () => {
  let component: MembersEditionFormComponent;
  let fixture: ComponentFixture<MembersEditionFormComponent>;

  const spyGaleriesService = jasmine.createSpyObj('spyGaleriesService', ['postEvent']);
  spyGaleriesService.postEvent.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersEditionFormComponent ],
      providers: [
        {
          provide: GaleriesService,
          useValue: spyGaleriesService
        },
        FormBuilder
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });
});
