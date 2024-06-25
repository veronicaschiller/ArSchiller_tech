import { Component } from '@angular/core';

import M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ArSchiller_tech';

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }
}
