import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEdit = false;
  selectedUserId?: number;

  // Catálogos de ejemplo (puedes obtenerlos del backend)
  instituciones = ['Institución1', 'Institución2', 'Institución3'];
  rolesDisponibles = ['admin', 'usuario', 'editor'];

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      institucion: ['', Validators.required],
      roles: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
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
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
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
