import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/models/institutions';
import { InstitutionsService } from 'src/app/services/institutions.service';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css'],
})
export class InstitutionListComponent implements OnInit {
  institutions: Institution[] = [];
  selectedInstitution: Institution | null = null;
  showModal = false;

  constructor(private institutionsService: InstitutionsService) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionsService.getInstitutions().subscribe((data) => {
      this.institutions = data;
    });
  }

  openCreateModal(): void {
    this.selectedInstitution = null;
    this.showModal = true;
  }

  openEditModal(institution: Institution): void {
    this.selectedInstitution = { ...institution };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadInstitutions(); // Actualizar lista al cerrar
  }

  deleteInstitution(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta institución?')) {
      this.institutionsService.deleteInstitution(id).subscribe(() => {
        this.loadInstitutions();
      });
    }
  }
}
