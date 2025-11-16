import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appHoverCard]'
})
export class HoverCardDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    console.log('hovered');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-3px)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 10px rgba(0,0,0,0.15)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', '0.2s ease');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
        console.log('unhovered');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 2px 4px rgba(0,0,0,0.08)');
  }
}