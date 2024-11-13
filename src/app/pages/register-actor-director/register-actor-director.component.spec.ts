import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterActorDirectorComponent } from './register-actor-director.component';

describe('RegisterActorDirectorComponent', () => {
  let component: RegisterActorDirectorComponent;
  let fixture: ComponentFixture<RegisterActorDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterActorDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterActorDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
