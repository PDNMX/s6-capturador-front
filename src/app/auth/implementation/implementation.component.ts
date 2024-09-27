import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map, Observable, of, tap, catchError, throwError } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/utils';


@Component({
  selector: 'app-implementation',
  templateUrl: './implementation.component.html',
  styleUrls: ['./implementation.component.css']
})


export class ImplementationComponent implements OnInit{

  idGlobal: any;
  isReadOnly: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {} //, private http: HttpClient) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe((params:any) => 
      {
        const id = params.get('id');
        this.idGlobal = id;
        console.log('contract id: ', id);
      });
  }

  implementation = this.fb.group({
    status: ['', Validators.required],
  });

  transactions= this.fb.group({
    id: ['',Validators.required],
    source: ['',Validators.required],
    date: ['',Validators.required],
    paymentMethod: ['',Validators.required],
    value: this.fb.group({
      amount: ['',Validators.required],
      currency: ['',Validators.required]
    }),
    payer: this.fb.group({
      id: ['',Validators.required],
      name: ['',Validators.required]
    }),
    payee: this.fb.group({
      id: ['',Validators.required],
      name: ['',Validators.required]
    }),
    uri: ['',Validators.required]
  });

  milestones= this.fb.group({
    id: ['',Validators.required],
    title: ['',Validators.required],
    type: ['',Validators.required],
    description: ['',Validators.required],
    code: ['',Validators.required],
    dueDate: ['',Validators.required],
    dateMet: ['',Validators.required],
    dateModified: ['',Validators.required],
    status: ['',Validators.required],
  });

  documents= this.fb.group({
    id: ['',Validators.required],
    documentType: ['',Validators.required],
    title: ['',Validators.required],
    description: ['',Validators.required],
    url: ['',Validators.required],  
    datePublished: ['',Validators.required],
    dateModified: ['',Validators.required],
    format: ['',Validators.required],
    Language: ['',Validators.required],
  });

}
