import { Component, OnInit } from '@angular/core';
import { Item } from './items.class';
import { Valor } from './valors.class';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  valueId: string = '';

  constructor(private fb: FormBuilder, private fireService: FirebaseService, private firestore: AngularFirestore) {
    this.fireService.getElements().subscribe(actionArray => {
      this.items = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Item;
      })
      let sel = this.items[0];
      this.selectedItem = sel;
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


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fireForm = this.fb.group({
      nombre: [''],
      description: [''],
      type: [''],
      sensitivity: ['']
    });
  }

  _changeItem(event) {
    let targ = event.target;
    let parent = document.querySelector('#options');
    let elms = parent.querySelectorAll('li');
    let valued = targ.getAttribute('class');
    var indexOfValue = this.items.findIndex(i => i.id === valued);
    console.log(indexOfValue);
    this.selectedItem = this.items[indexOfValue];
    for(let i = 0; i < elms.length; i++) {
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

  onSubmit(value){
    value.id = this.selectedItem.id;
    if(value.nombre == '') {
      value.nombre = this.selectedItem.nombre;
    }
    if(value.description == '') {
      value.description = this.selectedItem.description;
    }
    if(value.type == '') {
      value.type = this.selectedItem.type;
    }
    if(value.sensitivity == '') {
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

  _add(event) {

  }


}
