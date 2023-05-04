import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/helpers/auth-guard";
import { LoginComponent } from "./@shared/components/login/login.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { RegisterComponent } from "./@shared/components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { MovieSelectionComponent } from "./components/movie-selection/movie-selection.component"; 
import { ReviewPageComponent } from "./components/review-page/review-page.component";
import { UpdateReviewPageComponent } from "./components/update-review-page/update-review-page.component";
import { EditProfileComponent } from "./@shared/components/edit-profile/edit-profile.component";
const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "welcome", component: WelcomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "rankings", component: RankingsComponent },
      { path: "reviews/:id", component: ReviewPageComponent },
      { path: "update/:id", component: UpdateReviewPageComponent },
      { path: "edit-profile/:id", component: EditProfileComponent },
      
      { path: "", redirectTo: "welcome", pathMatch: 'full' },
      {path: "movie-selection", component: MovieSelectionComponent},
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
