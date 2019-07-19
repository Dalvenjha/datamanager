import { Component, OnInit } from '@angular/core';
import { Item } from './items.class';
import { Valor } from './valors.class';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  items: Item[];
  values: Valor[];
  selectedItem;
  fireForm: FormGroup;
  valueForm: FormGroup;
  nombre: string = '';
  valueId: string = '';
  addValue = false;

  lastkeydown1: number = 0;
  subscription: any;
  userList1 = [];

  constructor(private router: Router, private fb: FormBuilder, private fireService: FirebaseService, private firestore: AngularFirestore) {
    this.fireService.getElements().subscribe(actionArray => {
      this.items = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Item;
      })
      let sel = this.items[0];
      this.selectedItem = sel;
      let sels = this.items;
      this.userList1 = sels;
    });

    this.fireService.getValues().subscribe(actionArray => {
      this.values = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Valor;
      })
    });

  }

  //  testing autocomplete

  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('autocomplete')).value;
    this.userList1 = [];
    console.log(userId);

    if (userId.length > 1) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.searchFromArray(this.items, userId);
      }
    } else {
      this.userList1 = this.items;
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      let stringprin = arr[i].nombre;
      let strinchange = stringprin.toLowerCase();
      let regexed = regex.toLowerCase();
      if (strinchange.includes(regexed)) {
        this.userList1.push(arr[i]);
        console.log(this.userList1);
      }
    }
  };

  // testing autocomplete


  ngOnInit() {
    this.createForm();
    this.createValueForm();
  }

  createForm() {
    this.fireForm = this.fb.group({
      nombre: [''],
      description: [''],
      type: [''],
      sensitivity: ['']
    });
  }

  createValueForm() {
    this.valueForm = this.fb.group({
      key: [''],
      value: ['']
    });
  }

  _gotoEdit(event) {
    event.preventDefault();
    this.router.navigate(['/edit']);
  }

  _changeItem(event) {
    let targ = event.target;
    let parent = document.querySelector('#options');
    let elms = parent.querySelectorAll('li');
    let valued = targ.getAttribute('class');
    var indexOfValue = this.items.findIndex(i => i.id === valued);
    console.log(indexOfValue);
    this.selectedItem = this.items[indexOfValue];
    for (let i = 0; i < elms.length; i++) {
      elms[i].classList.remove('active');
    };
    targ.parentNode.classList.add('active');
  }

  _move(event) {
    let targ = event.target;
    let parent = targ.parentNode;
    let editr = document.querySelector('#editsection');

    parent.classList.toggle('edit-mode');
    editr.classList.toggle('editer');
  }

  _save(event) {
    let targ = event.target;
    let parent = targ.parentNode;
    let editr = document.querySelector('#contsection');

    parent.classList.toggle('editer');
    editr.classList.toggle('edit-mode');
  }

  resetFields() {
    let parent = document.querySelector('#editsection');
    let editr = document.querySelector('#contsection');

    parent.classList.toggle('editer');
    editr.classList.toggle('edit-mode');
  }

  _changeValue() {
    this.addValue = false;
  }

  onSubmit(value) {
    value.id = this.selectedItem.id;
    if (value.nombre == '') {
      value.nombre = this.selectedItem.nombre;
    }
    if (value.description == '') {
      value.description = this.selectedItem.description;
    }
    if (value.type == '') {
      value.type = this.selectedItem.type;
    }
    if (value.sensitivity == '') {
      value.sensitivity = this.selectedItem.sensitivity;
    }
    console.log(value);
    this.fireService.updateData(value)
      .then(
        res => {
          this.resetFields();
        }
      )
  }

  onSubmitValue(value) {
    if (value.nombre == '') {
      value.nombre = this.selectedItem.nombre;
    }
    if (value.description == '') {
      value.description = this.selectedItem.description;
    }
    if (value.type == '') {
      value.type = this.selectedItem.type;
    }
    if (value.sensitivity == '') {
      value.sensitivity = this.selectedItem.sensitivity;
    }
    console.log(value);
    this.fireService.createValue(value)
      .then(
        res => {
          this._changeValue();
        }
      )
  }

  _add(event) {
    this.addValue = true;
  }


}
