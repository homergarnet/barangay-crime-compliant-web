import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  accountType: string = '';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.loginTypeSubject$.subscribe(res => {

      this.accountType = res;

    })

  }

}
