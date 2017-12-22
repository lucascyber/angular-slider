import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items = [
    {title: 'Slider 1'},
    {title: 'Slider 2'},
    {title: 'Slider 3'},
  ]
}
