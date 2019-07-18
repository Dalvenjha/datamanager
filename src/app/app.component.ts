import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'datagate';

  _activate(event) {
    let targ = event.target;
    let parent = document.querySelector('#main-menu');
    let elements = parent.querySelectorAll('li');
    for(let i = 0; i < elements.length; i++) {
      let link = elements[i].querySelectorAll('a')[0];
      link.classList.remove('active');
    }
    targ.classList.add('active');
  }
}
