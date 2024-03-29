import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from 'src/app/pets.service';
import { Pet } from 'src/types/Pet';

@Component({
  selector: 'app-pets-details',
  templateUrl: './pets-details.component.html',
  styleUrls: ['./pets-details.component.css']
})
export class PetsDetailsComponent implements OnInit {

  constructor(private petsService: PetsService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  pet: Pet = {
    name: '',
    age: 0,
    petPhotoUrl: '',
    breed: '',
    owner: '',
    color: '',
    description: '',
    weight: '',
  }

  pets: Pet[] = [];

  loading: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.petsService.getPets().subscribe((data: Pet[]) => {
        const pet = data.find(item => item.id === params.get('id'));
        if (!pet.id) {
          return this.router.navigateByUrl('/');
        }

        this.pet = { ...pet as Pet };
      });
    })
  }

  updatePet(): void {
    if (!this.pet.name) {
      return this.openSnackBar('Informe um nome válido.')
    } else if (!this.pet.petPhotoUrl) [
      this.pet.petPhotoUrl = "data:image/png;base64,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"
    ]

    this.loading = true;

    this.petsService.updatePet(this.pet).subscribe(data => {
      this.openSnackBar('Pet alterado com sucesso.');
      this.router.navigateByUrl('/');
      this.loading = false;
    }, e => {
      this.openSnackBar(e.error.error);
      this.loading = false;
    });
  }

  handleResetInput(): void {
    this.pet = {
      name: '',
      age: 0,
      petPhotoUrl: '',
      breed: '',
      owner: '',
      color: '',
      description: '',
      weight: '',
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
  }
}
