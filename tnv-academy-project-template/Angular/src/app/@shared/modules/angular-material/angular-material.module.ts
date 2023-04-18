import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  exports: [MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule ],
})
export class AngularMaterialModule {}
