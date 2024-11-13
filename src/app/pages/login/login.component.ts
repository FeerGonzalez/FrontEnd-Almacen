import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../core/clases/login';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //loginForm: FormGroup;

  Api_Url = "" //cambiar por la url para el ingreso
  /*
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private http:HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordValidator });
  }*/

  passwordValidator(form: FormGroup) {
    const password = form.get('password');
    //hacer la validacion de la contraseña
  }

  usuario: Login = {
    email: "",
    contrasenia: ""
  }
  /*
  onSubmit() {
    if (this.loginForm.valid) {
      // Manejar el envío del formulario
      console.log('Formulario válido:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          // Aquí puedes redirigir al usuario o mostrar un mensaje
        },
        error => {
          console.error('Error al registrar:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }*/
}
