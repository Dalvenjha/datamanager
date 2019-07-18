import { Component, OnInit } from '@angular/core';
import { Regist } from './regists.class';
import { Valor } from '../manage/valors.class';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  regists: Regist[];
  values: Valor[];
  fireForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private fireService: FirebaseService, private firestore: AngularFirestore) { 
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

  resetFields() { 
    console.log('redo');
    this.router.navigate(['/']);
  }

  onSubmit(value){
    if(value.nombre == '') {
      
    }
    if(value.description == '') {
      
    }
    if(value.type == '') {
      
    }
    if(value.sensitivity == '') {
      
    }
    console.log(value);
    this.fireService.createUser(value)
    .then(
      res => {
        this.resetFields();
      }
    )
  }

}
