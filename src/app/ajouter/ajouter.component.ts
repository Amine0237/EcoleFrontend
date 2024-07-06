import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent {
  @ViewChild('myForm', {static: true}) myForm!: NgForm;
  
  url = "http://localhost:8082/etudiants";
  nom:any;
  prenom:any;
  adresse:any;
  email:any;
  telephone:any;
  newEtudiant:any;

  constructor(private http: HttpClient){}
  ngOnInit(): void{}

  onSubmit(myForm: NgForm){
    // this.myForm.reset();
    this.newEtudiant = {
      'nom': this.nom,
      'prenom': this.prenom,
      'adress': this.adresse,
      'email': this.email,
      'telephone': this.telephone
    }
    this.addEtudiant(this.newEtudiant);

  }

  addEtudiant(newEtudiant: any) {
    this.http.post(this.url, newEtudiant).subscribe(res => {
      console.log('Etudiant added successfully:', res);
      this.myForm.reset();
    }, error => {
      console.log('Error adding etudiant:', error);
      this.myForm.reset();
    });
  }

}
