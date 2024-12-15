import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDesplegableNavBarComponent } from './item-desplegable-nav-bar.component';

describe('ItemDesplegableNavBarComponent', () => {
  let component: ItemDesplegableNavBarComponent;
  let fixture: ComponentFixture<ItemDesplegableNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDesplegableNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDesplegableNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
