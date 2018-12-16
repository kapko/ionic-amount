import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsProvider } from '../providers/posts/posts';
import { Interceptor } from '../providers/interceptor';
import { CommonProvider } from '../providers/common/common';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: Interceptor },
        AuthProvider,
        PostsProvider,
        CommonProvider,
    ]
})
export class AppModule { }
