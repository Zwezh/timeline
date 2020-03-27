import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';

const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ opacity: 0 }), animate('0.5s ease-in-out', style({ opacity: 1 }))], { optional: true }),
      query(':leave', [style({ opacity: 1 }), animate('0.5s ease-in-out', style({ opacity: 0 }))], { optional: true })
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'Timeline';

  public getState(outlet: any): any {
    return outlet.activated && outlet.activatedRoute.component.name;
  }
}
