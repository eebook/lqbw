import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { User } from '../model/user-model';
import { fadeIn } from '../../animations/fade-in';


// Form model to be sent to API
interface RegisterFormModel {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}


@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.scss'],
    animations: [ fadeIn ],
})

export class UserRegisterComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}

