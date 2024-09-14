import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})

export class PlanningComponent implements OnInit {
  savingMessage: string = '';
  isSaving: boolean = false;


   //Almacenar los datos temporalmente para cada sección
  tempPlanning: any = {
    planning: [],
    budget: [],
    documents: [],
    requestForQuotes: [],
    milestones: [],
  };


  constructor(private fb:FormBuilder) {}
  ngOnInit() {}

  planning = this.fb.group ({
    rationale:['', Validators.required],
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

  budget = this.fb.group ({
    id: ['', Validators.required],
    projectID: ['', Validators.required],
    project: ['', Validators.required],
    description: ['', Validators.required],
    uri: ['', Validators.required],
    value: this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required]
    }),
    budgetBreakdown: this.fb.group ({
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
    budgetLines: this.fb.group ({
      id: ['', Validators.required],
      origin: ['', Validators.required]
    }),
    components: this.fb.group ({
      name: ['', Validators.required],
      level: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    })
  });


  documents = this.fb.group ({
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

  ;

/**/
    requestForQuotes = this.fb.group ({
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

  milestones = this.fb.group ({
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






  onSubmit(){
    console.log(this.planning.value);
  }


  onSubmitBudget() {
    console.log(this.budget.value);
    this.tempPlanning.budget.push(this.budget.value);
    this.showSavingMessage();
    this.budget.reset();
  }

  onSubmitDocuments() {
    console.log(this.documents.value);
    this.tempPlanning.documents.push(this.documents.value);
    this.showSavingMessage();
    this.documents.reset();
  }

 /**/  onSubmitQuotes() {
    console.log(this.requestForQuotes.value);
    this.tempPlanning.requestForQuotes.push(this.requestForQuotes.value);
    this.showSavingMessage();
    this.documents.reset();
  }

  onSubmitMilestones() {
    console.log(this.milestones.value);
    this.tempPlanning.milestones.push(this.milestones.value);
    this.showSavingMessage();
    this.documents.reset();
  }



  //Metodo del mensaje guardando
  showSavingMessage() {
/*     this.isSaving = true;
    this.savingMessage = 'Guardando...';
    setTimeout(() => {
      this.isSaving = false;
      this.savingMessage = '';
    }, 3000); */
  }

  //Metodo para combinar y enviar todos los datos
  submitAllSections() {
/*     const finalData = {
      id: this.tempPlanning.id,
      data: {
        award: {
          ...this.tempPlanning,
          suppliers: this.tempPlanning.suppliers,
        },
      },
    };
    console.log('Enviando todos los datos', finalData);
    this.postMethod(finalData); */
  }
}

// export class PlanningComponent implements OnInit {
//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params:any) => {
//       const id = params.get('id');
//       console.log('planning id: ', id);
//     });
//   }
// }
