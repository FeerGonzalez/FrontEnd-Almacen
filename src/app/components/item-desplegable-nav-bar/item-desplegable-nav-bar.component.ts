import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ItemDesplegableNavBarModel } from './item-desplegable-nav-bar-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'item-desplegable-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-desplegable-nav-bar.component.html',
  styleUrl: './item-desplegable-nav-bar.component.css',
})
export class ItemDesplegableNavBarComponent {
  @Input() data!: ItemDesplegableNavBarModel;

  constructor(private router: Router) {}

  navegar() {
    this.router.navigate(['/']);
  }
}
