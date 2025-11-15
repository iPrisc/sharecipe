import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  standalone: false,
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss'
})
export class FavoriteButtonComponent {
  @Input() isFavorite: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  onClick() {
    this.toggle.emit();
  }
}
