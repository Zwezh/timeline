import { Component } from '@angular/core';
import { GlobalRes } from '@appTextResources';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public globalRes: GlobalRes) { }
}
