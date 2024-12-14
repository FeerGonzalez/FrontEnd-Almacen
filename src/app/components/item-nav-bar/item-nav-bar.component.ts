import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ItemNavBar } from './item-nav-bar-model';

@Component({
  selector: 'app-item-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-nav-bar.component.html',
  styleUrl: './item-nav-bar.component.css',
})
export class ItemNavBarComponent {
  @Input() data!: ItemNavBar;

  constructor(private router: Router) {}

  navegar() {
    this.router.navigate([this.data.enlace]);
  }
}
