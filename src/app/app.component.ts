import { Component } from '@angular/core';
import { Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    public rootPage: string;

    constructor(
        public app: App,
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private menuController: MenuController
        // private navCtr: NavController
    ) {
        platform.ready().then(() => {
            this.rootPage = localStorage.token ? 'HomePage' : 'LoginPage';

            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    public getUsers(): void {
        this.app.getActiveNav().setRoot('UsersPage');
        this.menuController.close();
    }

    public getHomePage(): void {
        this.app.getActiveNav().setRoot('HomePage');
        this.menuController.close();
    }

    public logout(): void {
        localStorage.clear();
        this.app.getActiveNav().setRoot('LoginPage');
        this.menuController.close();
    }

    public newPost(): void {
        this.app.getActiveNav().push('EditPostPage');
        this.menuController.close();
    }

}

