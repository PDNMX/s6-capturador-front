import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartyRole } from 'src/utils';

@Component({
  selector: 'app-parties-general',
  templateUrl: './parties-general.component.html',
  styleUrls: ['./parties-general.component.css'],
})
export class PartiesGeneralComponent implements OnInit {
  @Output() saveGeneral = new EventEmitter<any>();
  generalForm!: FormGroup;
  additionalIdentifiersForm!: FormGroup;

  rolesList = PartyRole;
  optRole: string = '';

  optMemeberOf: string = '';

  tempParties = [
    {
      id: '1',
      name: 'Actor 1',
    },
    {
      id: '2',
      name: 'Actor 2',
    },
    {
      id: '3',
      name: 'Actor 3',
    },
  ];

  constructor(private fb: FormBuilder) {}

  getRoleByCode(code: string): any {
    return this.rolesList.find((e) => e.code === code);
  }

  get memberOfArray() {
    return this.generalForm.controls['memberOf'] as FormArray;
  }

  addMemberOf(): void {
    this.memberOfArray.push(this.fb.control(this.optMemeberOf));
  }

  deleteMemberOf(index: number): void {
    this.memberOfArray.removeAt(index);
  }

  get roleArray() {
    return this.generalForm.controls['roles'] as FormArray;
  }

  addRole(): void {
    this.roleArray.push(this.fb.control(this.optRole));
    this.optRole = '';
  }

  deleteRole(index: number): void {
    this.roleArray.removeAt(index);
  }

  get additionalIdentifiersArray() {
    return this.generalForm.controls['additionalIdentifiers'] as FormArray;
  }

  addAdditionalIdentifiers(): void {
    this.additionalIdentifiersArray.push(this.additionalIdentifiersForm);
    this.initAdditionalIdentifiersForm();
  }

  deleteAdditionalIdentifiers(index: number): void {
    this.additionalIdentifiersArray.removeAt(index);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initAdditionalIdentifiersForm(): void {
    this.additionalIdentifiersForm = this.fb.group({
      schema: ['MX-RFC', [Validators.required]],
      id: ['', [Validators.required]],
      uri: [
        'https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1705377302103&ssbinary=true',
        [Validators.required],
      ],
      legalName: ['', [Validators.required]],
    });
  }

  initForm(): void {
    this.generalForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      roles: this.fb.array([]),
      memberOf: this.fb.array([]),
      identifier: this.fb.group({
        legalPersonality: ['', [Validators.required]],
        schema: ['MX-RFC', [Validators.required]],
        id: ['', [Validators.required]],
        uri: [
          'https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1705377302103&ssbinary=true',
          [Validators.required],
        ],
        legalName: ['', [Validators.required]],
        givenName: ['', [Validators.required]],
        patronymicName: ['', [Validators.required]],
        matronymicName: ['', [Validators.required]],
      }),
      additionalIdentifiers: this.fb.array([]),
      details: this.fb.group({
        listedOnRegulatedMarket: [false, [Validators.required]],
      }),
    });

    this.initAdditionalIdentifiersForm();
  }

  save(): void {
    // console.log(this.generalForm.value);
    this.saveGeneral.emit(this.generalForm);
  }
}
