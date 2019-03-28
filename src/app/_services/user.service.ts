import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    id = 1;
    constructor(private http: HttpClient) { }

    getById() {
        return this.id++;
    }
}
