import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../../core/clases/genero';
import { GeneroService } from '../../core/services/genero.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-genero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    CardModule,
  ],
  templateUrl: './genero-form.component.html',
  styleUrl: './genero-form.component.css'
})
export class GeneroFormComponent {
  generoForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private generoService: GeneroService,
    private messageService: MessageService
  ) {
    this.generoForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.generoForm.invalid) return;

    this.isSubmitting = true;

    const genero = new Genero();

    genero.nombre = this.generoForm.get('nombre')?.value;

    this.generoService.createGenero(genero).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Genero guardado exitosamente'
        });
        this.isSubmitting = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar el genero'
        });
        this.isSubmitting = false;
      },
    });
  }

  onCancel() {
    this.router.navigate(['/home']); // O redirige a donde lo necesites
  }
}
