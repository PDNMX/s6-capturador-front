
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})

export class ContractsComponent implements OnInit{

  //contractsData:FormGroup;implements OnInit


  constructor(private fb: FormBuilder) { }
  ngOnInit() {

  }

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
      additionalClassifications: this.fb.group({}),
      quantity: ['', Validators.required],
      unit: this.fb.group({
        scheme: ['', Validators.required],
        id: ['', Validators.required],
        name: ['', Validators.required],
        url: ['', Validators.required],
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
      url: ['', Validators.required],
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

  // Para ser usado con el constructor vacio
/*
contractsData = new FormGroup({
    status: new FormControl('status')
  }); */
  onSubmit() {
    console.log(this.contracts.value);
  }
  onSubmit2() {
    console.log(this.items.value);
  }
  onSubmit3() {
    console.log(this.items.value);
  }
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
