import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { getRoleTitle } from 'src/utils/partyRole';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
})
export class PartiesComponent implements OnInit {
  record_id = null;
  partiesForm!: FormGroup;
  partieForm!: FormGroup;

  editMode: boolean = false;

  Parties!: FormGroup;
  showBeneficiariesSection: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  newPartie(): void {
    this.editMode = true;
  }

  get partiesArray() {
    return this.partiesForm.controls['parties'] as FormArray;
  }

  onShowBeneficiaries(show: boolean) {
    this.showBeneficiariesSection = show;
  }

  deletePartie(index: number): void {
    this.partiesArray.removeAt(index);
    this.saveData();
  }

  getRoleTitle(code: string): string {
    return getRoleTitle(code);
  }

  getParties(): string {
    return JSON.stringify(this.partiesForm.value, undefined, 4);
  }

  getPartie(): string {
    return JSON.stringify(this.partieForm.value, undefined, 4);
  }

  savePartie(): void {
    const parties = this.partiesArray;
    parties.push(this.partieForm);
    this.initPartieForm();
    this.saveData();
    this.editMode = false;
  }

  cancelPartie(): void {
    this.initPartieForm();
    this.editMode = false;
  }

  saveGeneral(general: FormGroup): void {
    this.partieForm = this.fb.group({
      ...general.controls,
      ...this.partieForm.controls,
    });
  }

  saveAddress(address: FormGroup): void {
    this.partieForm = this.fb.group({
      ...this.partieForm.controls,
      address: this.fb.group({
        ...address.controls,
      }),
    });
  }

  saveContactPoint(contactPoint: FormGroup): void {
    this.partieForm = this.fb.group({
      ...this.partieForm.controls,
      contactPoint: this.fb.group({
        ...contactPoint.controls,
      }),
    });
  }

  get additionalContactPointsArray() {
    return this.partieForm.controls['additionalContactPoints'] as FormArray;
  }

  addAdditionalContactPoints(contact: any): void {
    this.additionalContactPointsArray.push(contact);
  }

  deleteAdditionalContactPoints(index: number): void {
    this.additionalContactPointsArray.removeAt(index);
  }

  get beneficialOwnersArray() {
    return this.partieForm.controls['beneficialOwners'] as FormArray;
  }

  addBeneficialOwners(beneficialOwners: any): void {
    this.beneficialOwnersArray.push(beneficialOwners);
  }

  deleteBeneficialOwners(index: number): void {
    this.beneficialOwnersArray.removeAt(index);
  }

  getAddress() {
    return this.partieForm.controls['address'] as FormGroup;
  }

  loadForm(data: any): void {
    data.forEach((partie: any) => {
      this.partiesArray.push(this.fb.control(partie));
    });
  }

  loadData(): void {
    this.api.getMethod(`/parties/${this.record_id}`).subscribe((d: any) => {
      const { parties, error, message } = d;

      if (error) {
        console.log('message: ', message);
      } else {
        // load forms
        if (parties !== null) this.loadForm(parties);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.record_id = params.get('id');
    });

    this.initForm();
    this.loadData();
  }

  initPartieForm(): void {
    this.partieForm = this.fb.group({
      address: null,
      contactPoint: null,
      additionalContactPoints: this.fb.array([]),
      beneficialOwners: this.fb.array([]),
    });
  }

  initForm(): void {
    this.partiesForm = this.fb.group({
      parties: this.fb.array([]),
    });

    this.initPartieForm();
  }

  saveData(): void {
    console.log('partiesForm', this.partiesForm.value);

    this.api
      .postMethod({ ...this.partiesForm.value }, `/parties/${this.record_id}`)
      .subscribe((r: any) => {
        console.log('r: ', r);
        if (r.err) {
          console.log('r: ', r);
        } else {
          this.initForm();
          this.loadData();
          // const id = r.data._id;
          // console.log('id: ', id);
          // this.router.navigate([`/planning/${id}`]);
        }
      });
  }
}
