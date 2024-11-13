import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount: number = 0; // This should reflect the actual cart count

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) {}

  onSearch(event: any) {
    const query = event.target.value;
    this.search.emit(query); // Emit search query to parent component
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
