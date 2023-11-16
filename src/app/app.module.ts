import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppLayoutComponent } from './components/core/app-layout/app-layout.component';
import { TipsComponent } from './components/core/tips/tips.component';
import { RegisterJobSeekerComponent } from './components/register-job-seeker/register-job-seeker.component';
import { HomeComponent } from './components/home/home.component';
import { DragAndDropUploadDirective } from './directives/drag-and-drop-upload.directive';
import { CardNumberMaskDirective } from './directives/card-number.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { CardNumberMaskPipe } from './pipes/card-number-mask.pipe';
import { ShowJobSeekerComponent } from './components/show-job-seeker/show-job-seeker.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    HomeComponent,
    TipsComponent,
    LoadingComponent,
    ShowJobSeekerComponent,
    RegisterJobSeekerComponent,

    DragAndDropUploadDirective,
    CardNumberMaskDirective,
    OnlyNumberDirective,
    CardNumberMaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule // required animations module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
