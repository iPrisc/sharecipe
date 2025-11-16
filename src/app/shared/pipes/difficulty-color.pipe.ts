import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyColor',
  standalone: false
})

export class DifficultyColorPipe implements PipeTransform {
  transform(diff: string): string {
    switch (diff?.toLowerCase()) {
      case 'facile':
        return 'green';
      case 'moyen':
        return 'orange';
      case 'difficile':
        return 'red';
      default:
        return 'black';
    }
  }
}