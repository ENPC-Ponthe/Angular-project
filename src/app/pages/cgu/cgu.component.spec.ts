import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CguComponent } from './cgu.component';
import { AssetsService } from '../../services/assets.service';

describe('CguComponent', () => {
  let component: CguComponent;
  let fixture: ComponentFixture<CguComponent>;
  const spyAssetsService = jasmine.createSpyObj('spyAssetsService', ['getCGU']);
  const fakeCGU = {
    articles: {
      1: {
        title: 'Test title',
        body: 'Test body',
      },
      2: {
        title: 'Test title',
        body: 'Test body',
      },
    },
  };
  spyAssetsService.getCGU.and.returnValue(of(fakeCGU));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CguComponent ],
      providers: [
        {
          provide: AssetsService,
          useValue: spyAssetsService,
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stores the right cgu', () => {
    const fakeCGUArticles = [
      {
        title: 'Test title',
        body: 'Test body',
      },
      {
        title: 'Test title',
        body: 'Test body',
      },
    ];
    expect(component.articles).toEqual(fakeCGUArticles);
  });
});
