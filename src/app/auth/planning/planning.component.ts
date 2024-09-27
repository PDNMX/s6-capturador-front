import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})

export class PlanningComponent implements OnInit {
  record_id = null;
  planningForm!: FormGroup;

  // savingMessage: string = '';
  // isSaving: boolean = false;

  //Almacenar los datos temporalmente para cada sección
  /*   tempPlanning: any = {
      planning: [],
      budget: [],
      documents: [],
      requestForQuotes: [],
      milestones: [],
    }; */
  //planning: FormGroup = new FormGroup({});
  //budget: FormGroup = new FormGroup({});
  //documents: FormGroup = new FormGroup({});
  //requestForQuotes: FormGroup = new FormGroup({});
  //milestones: FormGroup = new FormGroup({});  


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  // Sección de planning (planificación)
  get planningArray() {
    return this.planningForm.controls['planning'] as FormArray;
  }
  addPlanning(opt: any): void {
    this.planningArray.push(opt);
  }
  deletePlanning(index: number): void {
    this.planningArray.removeAt(index);
  } 

  // Sección de budget (presupuesto)
  get budgetArray() {
    return this.planningForm.controls['budget'] as FormArray;
  }
  addBudget(opt: any): void {
    this.budgetArray.push(opt);
  }
  deleteBudget(index: number): void {
    this.budgetArray.removeAt(index);
  }   
 
  // Sección de documents (documentos)
  get documentsArray() {
    return this.planningForm.controls['documents'] as FormArray;
  }
  addDocument(opt: any): void {
    this.documentsArray.push(opt);
  }
  deleteDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }


  // Sección de requestForQuotes (cotizaciones)
  get requestForQuotesArray() {
    return this.planningForm.controls['requestForQuotes'] as FormArray;
  }
  addRequestForQuotes(opt: any): void {
    this.requestForQuotesArray.push(opt);
  }
  deleteRequestForQuotes(index: number): void {
    this.requestForQuotesArray.removeAt(index);
  } 


  // Sección de items  (articulos )
  get itemsArray() {
    return this.planningForm.controls['items'] as FormArray;
  }
  addItems(opt: any): void {
    this.itemsArray.push(opt);
  }
  deleteItems(index: number): void {
    this.itemsArray.removeAt(index);
  }

  // Sección de milestones (hitos)
  get milestonesArray() {
    return this.planningForm.controls['milestones'] as FormArray;
  }
  addMilestones(opt: any): void {
    this.milestonesArray.push(opt);
  }
  deleteMilestones(index: number): void {
    this.milestonesArray.removeAt(index);
  } 


  saveGeneralData(opt: any): void {
    this.planningForm = this.fb.group({
      ...opt,
      ...this.planningForm.controls,
    });
  }




  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
      console.log('planning id: ', this.record_id);
    });

    this.planningForm = this.fb.group({
      planning: this.fb.array([], [Validators.required]),
      budget: this.fb.array([], [Validators.required]),
      documents: this.fb.array([], [Validators.required]), 
      requestForQuotes: this.fb.array([], [Validators.required]),
      milestones: this.fb.array([], [Validators.required]),
    });

 
  }

/*
   planning = this.fb.group({
    rationale: ['', Validators.required],
    hasQuotes: ['', Validators.required],
    contractingUnits: this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    }),
    requestingUnits: this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    }),
    responsibleUnits: this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    })
  });

  budget = this.fb.group({
    id: ['', Validators.required],
    projectID: ['', Validators.required],
    project: ['', Validators.required],
    description: ['', Validators.required],
    uri: ['', Validatpassword1_oauthValidators.required]
    }),
    budgetBreakdown: this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      project: ['', Validators.required],
      uri: ['', Validators.required],
      value: this.fb.group({
        amount: ['', Validators.required],
        currency: ['', Validators.required]
      }),
      period: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        maxExtentDate: ['', Validators.required],
        durationInDays: ['', Validators.required]
      }),
      sourceParty: this.fb.group({
        name: ['', Validators.required],
        id: ['', Validators.required]
      })
    }),
    budgetLines: this.fb.group({
      id: ['', Validators.required],
      origin: ['', Validators.required]
    }),
    components: this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    })
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

  requestForQuotes = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    period: this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxExtentDate: ['', Validators.required],
      durationInDays: ['', Validators.required]
    }),
    items: this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      value: this.fb.group({
        amount: [''],
        currency: [''],
      }),
      unit: this.fb.group({
        id: [''],
        scheme: [''],
        name: [''],
        uri: [''],
      }),
      classification: this.fb.group({
        id: ['', Validators.required],
        description: ['', Validators.required],
        scheme: [''],
        uri: [''],
      }),
      additionalClassifications: this.fb.group({
        id: ['', Validators.required],
        description: ['', Validators.required],
        scheme: [''],
        uri: [''],
      }),
    })
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



 */

  submit(): void {
    console.log(this.planningForm.value);

    this.api
      .postMethod({...this.planningForm.value}, `/planning/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          const id = r.data._id;
          console.log('id: ', id);
        }
      });
  }

 /*  onSubmit() {
    console.log(this.planningForm.value);
  } */


/*   onSubmitBudget() {
   console.log(this.budget.value);
    this.tempPlanning.budget.push(this.budget.value);
    this.showSavingMessage();
    this.budget.reset();
  } */

/*   onSubmitDocuments() {
   console.log(this.documents.value);
    this.tempPlanning.documents.push(this.documents.value);
    this.showSavingMessage();
    this.documents.reset();
  } */

 /* onSubmitQuotes() {
    console.log(this.requestForQuotes.value);
    this.tempPlanning.requestForQuotes.push(this.requestForQuotes.value);
    this.showSavingMessage();
    this.documents.reset();
  }
*/ 
/*   onSubmitMilestones() {
   console.log(this.milestones.value);
    this.tempPlanning.milestones.push(this.milestones.value);
    this.showSavingMessage();
    this.documents.reset();
  } */



  //Metodo del mensaje guardando
/*   showSavingMessage() {
         this.isSaving = true;
        this.savingMessage = 'Guardando...';
        setTimeout(() => {
          this.isSaving = false;
          this.savingMessage = '';
        }, 3000); 
  } */

  //Metodo para combinar y enviar todos los datos
/*   submitAllSections() {
        const finalData = {
          id: this.tempPlanning.id,
          data: {
            award: {
              ...this.tempPlanning,
              suppliers: this.tempPlanning.suppliers,
            },
          },
        };
        console.log('Enviando todos los datos', finalData);
        this.postMethod(finalData); 
  } */
}
