import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MoviesService } from '../../core/services/movies.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { ActoresService } from '../../core/services/actores.service';
import { DirectorService } from '../../core/services/director.service';
import { Actor } from '../../core/clases/actor';
import { Director } from '../../core/clases/director';

@Component({
  selector: 'app-register-actor-director',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    CardModule
  ],
  templateUrl: './register-actor-director.component.html',
  styleUrls: ['./register-actor-director.component.css']
})
export class RegisterActorDirectorComponent implements OnInit {
  registerForm: FormGroup;
  tipoOptions = [
    { label: 'Actor', value: 'actor' },
    { label: 'Director', value: 'director' }
  ];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private actorService: ActoresService,
    private directorService: DirectorService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    
    const nombre = this.registerForm.get('nombre')?.value;
    const apellido = this.registerForm.get('apellido')?.value;

    const nuevoActorODirector = { nombre, apellido };

    if(this.registerForm.get('tipo')?.value.label === 'Actor'){
      const actor = new Actor();
      actor.nombre = this.registerForm.get('nombre')?.value;
      actor.apellido = this.registerForm.get('apellido')?.value;
      this.actorService.createActor(actor);
    }else{
      const director = new Director();
      director.nombre = this.registerForm.get('nombre')?.value;
      director.apellido = this.registerForm.get('apellido')?.value;
      this.directorService.createDirector(director);
    }
    const url = this.registerForm.get('tipo')?.value.label === 'Actor' ? 'http://localhost:8080/almacen/actor' : 'http://localhost:8080/almacen/director';
    
    this.http.post(url, nuevoActorODirector).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        // Mostrar un mensaje de éxito
        //this.router.navigate(['/home']); // O redirige a donde lo necesites
      },
      error: (err) => {
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/home']); // O redirige a donde lo necesites
  }
}
