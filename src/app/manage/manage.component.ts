import { Component, OnInit } from '@angular/core';
import { Item } from './items.class';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  items: Item[];

  constructor(private fireService: FirebaseService, private firestore: AngularFirestore) { 
    this.fireService.getElements().subscribe(actionArray => {
      this.items = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Item;
      })
    });
  }

  ngOnInit() {
  }

}
