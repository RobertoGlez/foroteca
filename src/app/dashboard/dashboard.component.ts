import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users:Observable<any>;

  constructor(db:AngularFirestore) {
    this.users = db.collection('usuarios').valueChanges();
    this.users.subscribe((u)=>{
      console.log("Usuario ->",u);
    });
  }

  ngOnInit() {
  }

}
