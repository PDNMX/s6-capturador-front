import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map, Observable, of, tap, catchError, throwError } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';


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

  implements = this.fb.group({
    contractId: [''],
    implementationDate: [''],
    implementationStatus: [''],
    implementationDescription: [''],
    implementationCost: [''],
    implementationNotes: ['']
  });
}
