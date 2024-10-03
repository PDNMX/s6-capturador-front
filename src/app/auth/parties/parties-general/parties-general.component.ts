import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPartieList } from 'src/app/services/api.service';
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

  record_id = null;

  rolesList = PartyRole;
  optRole: string = '';

  optMemberOf: string = '';

  memberOfList: any = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  getRoleByCode(code: string): any {
    return this.rolesList.find((e) => e.code === code);
  }

  get memberOfArray() {
    return this.generalForm.controls['memberOf'] as FormArray;
  }

  addMemberOf(): void {
    this.memberOfArray.push(this.fb.control(this.optMemberOf));
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

    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    if (this.record_id) {
      this.api.getPartiesByType(this.record_id).subscribe((d: IPartieList) => {
        this.memberOfList = d.data;
      });
    }
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
