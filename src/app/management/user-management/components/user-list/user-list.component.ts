import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Institution } from 'src/app/models/institutions';
import { User } from 'src/app/models/user';
import { InstitutionsService } from 'src/app/services/institutions.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  institutions: Institution[] = [];
  userForm: FormGroup;
  isEdit = false;
  selectedUserId?: number;

  rolesDisponibles = ['admin', 'usuario'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private institutionsService: InstitutionsService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      scope: [[], Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      institution: ['', Validators.required],
    });
  }

  loadInstitutions(): void {
    this.institutionsService.getInstitutions().subscribe((data) => {
      this.institutions = data;
    });
  }

  getInstitutionName(id: string): string {
    const ins: Institution = this.institutions.filter((d) => d._id === id)[0];
    return ins?.name || '';
  }

  getRolesString(roles: string[]): string {
    return roles.filter((d) => d !== 'read').join(', ');
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadInstitutions();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  openCreateModal(): void {
    this.isEdit = false;
    this.selectedUserId = undefined;
    this.userForm.reset();
    this.showModal();
  }

  openEditModal(user: User): void {
    this.isEdit = true;
    this.selectedUserId = user._id;
    this.userForm.patchValue(user);
    this.showModal();
  }

  saveUser(): void {
    const client_id = environment.OAUTH_CLIENT_ID;
    const client_secret = environment.OAUTH_CLIENT_SECRET;

    if (this.userForm.valid) {
      const user: User = { ...this.userForm.value, client_id, client_secret };
      if (this.isEdit && this.selectedUserId) {
        this.userService.updateUser(this.selectedUserId, user).subscribe(() => {
          this.loadUsers();
          this.closeModal();
        });
      } else {
        this.userService.createUser(user).subscribe(() => {
          this.loadUsers();
          this.closeModal();
        });
      }
    }
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  // Métodos para controlar el modal de Bootstrap
  private showModal(): void {
    const modal = document.getElementById('userModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('userModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
}
