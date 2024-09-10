
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Contract } from './contract.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})

export class ContractsComponent implements OnInit{
  /* Lo que regresan los endpoint's */
  data: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  /* Datos de ejemplo */
dataToSend = {};
id: string = '1';
dataToUpdate = {
  name: 'Updated Name',
  email: 'updated.email@example.com'
};

  //contractsData:FormGroup;implements OnInit
constructor(private fb: FormBuilder, private apiService: ApiService){}//, private http: HttpClient) { }
  ngOnInit():void {
    //this.additionalClassifications = new FormControl();
    //this.postMethod(this.dataToSend);
    //this.getMethod();

/*     this.getMethodId();
    this.postMethod();
    this.putMethod();
    this.deleteMethod(); */
    /*
    this.getMethodId(); */
  }

  // Para jsonplaceholder


   getMethod():void{
    this.apiService.getMethod('/get').subscribe(
      data => {this.data = data; console.log("data recibida por la funcion", data);},
      error => console.error('Error fetching data:', error
    ));
  }

  getMethodId():void{
    this.apiService.getMethod('/todos/1').subscribe(
      data4 => this.data4 = data4,
      error => console.error('Error fetching data:', error
    ));
  }

/*   postMethod(){
    this.apiService.postMethod<any>(this.dataToSend, 'posts')
    .subscribe(
      (data1: any) => {
        console.log('Data returned successfully:', data1);
        this.data1 = data1;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error returning data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  } */

    //Para ser usado con el api del s6
  postMethod(dataToSend: any){
    this.apiService.postMethod<any>(this.dataToSend, '/contracts/insert')
    .subscribe(
      (data1: any) => {
        console.log('Data returned successfully:', data1);
        this.data1 = data1;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error returning data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  putMethod(){
    this.apiService.putMethod<any>(this.id, this.dataToUpdate, '/posts/1')
    .subscribe(
      (data2: any) => {
        console.log('Data updated successfully:', data2);
        this.data2 = data2;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error updating data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  deleteMethod(){
    this.apiService.deleteMethod<any>(this.id, '/posts/${id}')
    .subscribe(
      (data3: any) => {
        console.log('Data deleted successfully:', data3);
        this.data3 = data3;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error deleting data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  //Funcionando para httpbin
  /* getMethod():void{
    this.apiService.getMethod('get').subscribe(
      data => this.data = data,
      error => console.error('Error fetching data:', error
    ));
  }

  getMethodId():void{
    this.apiService.getMethod('get?id=1').subscribe(
      data4 => this.data4 = data4,
      error => console.error('Error fetching data:', error
    ));
  }

  postMethod(){
    this.apiService.postMethod<any>(this.dataToSend, 'post')
    .subscribe(
      (data1: any) => {
        console.log('Data returned successfully:', data1);
        this.data1 = data1;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error returning data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  putMethod(){
    this.apiService.putMethod<any>(this.id, this.dataToUpdate, 'put')
    .subscribe(
      (data2: any) => {
        console.log('Data updated successfully:', data2);
        this.data2 = data2;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error updating data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }

  deleteMethod(){
    this.apiService.deleteMethod<any>(this.id, 'delete')
    .subscribe(
      (data3: any) => {
        console.log('Data deleted successfully:', data3);
        this.data3 = data3;
        // Handle successful response (e.g., update UI)
      },
      (error) => {
        console.error('Error deleting data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    );
  }
     */

  // Para ser usado con el constructor private fb: Formbuilder

  contracts = this.fb.group({
    id : ['', Validators.required],
    status: ['', Validators.required],
    awardID: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    surveillanceMechanisms: ['', Validators.required],
    period : this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      durationInDays: ['', Validators.required],
      maxExtentDate: ['', Validators.required]
    }),
    value : this.fb.group({
      amount: ['', Validators.required],
      amountNet: ['', Validators.required],
      currency: ['', Validators.required]
    }),
    dateSignedContracts : this.fb.group({
      dateSigned: ['', Validators.required]
    }),
    });


    items = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      clasification: this.fb.group({
        scheme: ['', Validators.required],
        id: ['', Validators.required],
        uri: ['', Validators.required],
        description: ['', Validators.required]
      }),
/*       additionalClassifications: this.fb.FormArray([
        this.fb.group({
          scheme: ['', Validators.required],
          id: ['', Validators.required],
          uri: ['', Validators.required],
          description: ['', Validators.required]
        })
      ]), */
        additionalClassifications: this.fb.group({
        scheme: ['', Validators.required],
        id: ['', Validators.required],
        uri: ['', Validators.required],
        description: ['', Validators.required]
       }),
      quantity: ['', Validators.required],
      unit: this.fb.group({
        scheme: ['', Validators.required],
        id: ['', Validators.required],
        name: ['', Validators.required],
        uri: ['', Validators.required],
        value: this.fb.group({
          amount: ['', Validators.required],
          currency: ['', Validators.required]
        }),
      }),
      deliveryLocation: this.fb.group({
        uri: ['', Validators.required],
        description: ['', Validators.required],
        geometry: this.fb.group({
          type: ['', Validators.required],
          coordinates: this.fb.group({
            latitude: ['', Validators.required],
            longitude: ['', Validators.required]
          }),
          gazetteer: this.fb.group({
            scheme: ['', Validators.required],
            identifiers: ['', Validators.required]
          })
        }),
      }),
      deliveryAddress: this.fb.group({
        uri: ['', Validators.required],
        description: ['', Validators.required],
        streetAddress: ['', Validators.required],
        locality: ['', Validators.required],
        region: ['', Validators.required],
        postalCode: ['', Validators.required],
        countryName: ['', Validators.required]
      }),
    });

    guarantees = this.fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      obligations: ['', Validators.required],
      value: this.fb.group({
          amount: ['', Validators.required],
          currency: ['', Validators.required]
        }),
      guarantor: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        durationInDays: ['', Validators.required],
        maxExtentDate: ['', Validators.required]
      }),
    });

    documents = this.fb.group({
      id: ['', Validators.required],
      documentType: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      uri: ['', Validators.required],
      datePublished: ['', Validators.required],
      dateModified: ['', Validators.required],
      format: ['', Validators.required],
      language: ['', Validators.required]
    });

    relatedProcesses = this.fb.group({
      id: ['', Validators.required],
      relationship: ['', Validators.required],
      title: ['', Validators.required],
      scheme: ['', Validators.required],
      identifier: ['', Validators.required],
      uri: ['', Validators.required]
    });

    milestones = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      dueDate: ['', Validators.required],
      dateMet: ['', Validators.required],
      dateModified: ['', Validators.required],
      status: ['', Validators.required]
    });

    amendments = this.fb.group({
      id: ['', Validators.required],
      date: ['', Validators.required],
      rationale: ['', Validators.required],
      description: ['', Validators.required],
      amendsReleaseID: ['', Validators.required],
      releaseID: ['', Validators.required],
    });


/* Mostrar en consolo el contenido de los formularios */
  onSubmit() {
   console.log(this.contracts.value);
   this.dataToSend = this.contracts.value;
   console.log("Mandando datos");
   this.postMethod(this.contracts);


  }
  onSubmit2() {
    console.log(this.documents.value);

  }

  onSubmit3() {
    console.log(this.items.value);
    this.dataToSend = this.items.value;
    console.log("Mandando datos de items");
    this.postMethod(this.dataToSend);
  }

  addPassenger(){}

  onSubmit4() {
    console.log(this.items.value);
  }
  onSubmit5() {
    console.log(this.milestones.value);
  }
  onSubmit6() {
    console.log(this.amendments.value);
  }
}
