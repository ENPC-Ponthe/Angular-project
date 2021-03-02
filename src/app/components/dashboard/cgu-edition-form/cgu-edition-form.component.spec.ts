import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GaleriesService } from '../../../services/galeries.service';
import { HttpService } from '../../../services/http.service';
import { CguEditionFormComponent } from './cgu-edition-form.component';

describe('GalleryCreationFormComponent', () => {
  let component: CguEditionFormComponent;
  let fixture: ComponentFixture<CguEditionFormComponent>;

  const spyGaleriesService = jasmine.createSpyObj('spyGaleriesService', ['postEvent']);
  spyGaleriesService.postEvent.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CguEditionFormComponent ],
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
    fixture = TestBed.createComponent(CguEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });
});
