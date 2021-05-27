import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../service/shipment.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent implements OnInit {
  public shipments: any = [];

  constructor(
    private shipmentService: ShipmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    !this.authService.isLoggedIn()
      ? this.router.navigate([''])
      : this.shipmentService
          .getAll()
          .subscribe((s) => (this.shipments = [...s]));
  }

  public logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']).catch((e) => console.log(e.message));
  }
}
