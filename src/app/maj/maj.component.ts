import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-maj',
  templateUrl: './maj.component.html',
  styleUrls: ['./maj.component.css']
})
export class MajComponent implements OnInit{
  @ViewChild('myForm', {static: true}) myForm!: NgForm;

  etudiantId: any;
  updatedEtudiant: any = {};
  url = "http://localhost:8082/etudiants";

  constructor(private route: ActivatedRoute, private http: HttpClient,  private router: Router, private sharedService: SharedService){}
  ngOnInit(): void {
    this.etudiantId = this.route.snapshot.paramMap.get('id');
    this.getEtudiantDetails();
  }

  getEtudiantDetails(){
    this.sharedService.getEtudiantById(this.etudiantId).subscribe(
      res => {
        this.updatedEtudiant = res;
      },
      error => {
        console.log('Error fetching etudiant details: ', error);
      }
    )

  }

  onSubmit(){
    this.updateEtudiant(this.etudiantId, this.updatedEtudiant);
  }

  updateEtudiant(etudiantId:number, updatedEtudiant:any){
    this.http.put(`${this.url}/${this.etudiantId}`, this.updatedEtudiant).subscribe(res => {
      console.log('Etudiant updated successfully:', res);
      this.router.navigate(['/home']); // Navigate back to home or another route after successful update
    }, error => {
      console.log('Error updating etudiant:', error);
    });
  }




}
