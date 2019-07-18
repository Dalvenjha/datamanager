import { Component, OnInit } from '@angular/core';
import { Request } from './requests.class';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  requests: Request[];
  selectedItems = [];

  constructor(private fireService: FirebaseService, private firestore: AngularFirestore) {
    this.fireService.getRequests().subscribe(actionArray => {
      this.requests = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Request;
      })
      let sel = this.requests;
      this.selectedItems = sel;
    });
  }

  ngOnInit() {
  }

  _filterArray(event) {
    let targ = event.target;
    let parent = targ.parentNode;
    let filterItem = targ.getAttribute('rel');
    let items = parent.querySelectorAll('p');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }
    targ.classList.add('active');
    if (filterItem == "all") {
      this.selectedItems = this.requests;
    } else {
      let filteredvalues = this.requests.filter(t => t.status === filterItem);
      this.selectedItems = filteredvalues;
    }
  }

}
