import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  ContentChildren, 
  QueryList, 
  Directive, 
  ElementRef, 
  ViewChildren,
  Input, 
  ViewChild} from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { SliderItemDirective } from './slider-item.directive';

@Directive({
  selector: '.slider-item'
})
export class SliderItemElement {}

@Component({
  selector: 'slider',
  exportAs: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})


export class SliderComponent implements AfterViewInit {

  @ContentChildren(SliderItemDirective) items: QueryList<SliderItemDirective>;
  @ViewChildren(SliderItemElement, { read: ElementRef }) private itemsSliders : QueryList<ElementRef>;
  @ViewChild('slider') private slider : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player : AnimationPlayer;
  private currentSlide = 0;
  private itemWidth: number;
  sliderWrapperStyle = {}

  next() {
    if( this.currentSlide + 1 === this.items.length ) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.slider.nativeElement);
    this.player.play();
  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    if( this.currentSlide === 0 ) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.slider.nativeElement);
    this.player.play();
  }

  constructor(private builder : AnimationBuilder) { }

  ngAfterViewInit() {
    this.itemWidth = this.itemsSliders.first.nativeElement.getBoundingClientRect().width;

    this.sliderWrapperStyle = {
      width: `${this.itemWidth}px`
    }
  }

}
