import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  etudiants:any;
  url = "http://localhost:8082/etudiants";


  constructor(private http: HttpClient, private router: Router){}
  
  ngOnInit(): void {
    this.getEtudiants();
  }

  getEtudiants(){
    this.http.get(this.url).subscribe(res => {
      this.etudiants = res;
      console.log(this.etudiants);
    }, error => {
      console.log(error);
    }, () => {
      console.log('completed');
    });
    
  }

  deleteEtudiant(id:number){
    const deleteUrl = `${this.url}/${id}`;
    this.http.delete(deleteUrl).subscribe(res => {
      console.log('Etudiant deleted successfully:', res);
      this.getEtudiants(); // Refresh the list of students
    }, error => {
      console.log('Error deleting etudiant:', error);
    });
  }

  navigateToMaj(id: number) {
    this.router.navigate(['/maj', id]);
  }
}
