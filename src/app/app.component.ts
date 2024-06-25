import { Component } from '@angular/core';

import * as M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArSchiller_tech';

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }
}
