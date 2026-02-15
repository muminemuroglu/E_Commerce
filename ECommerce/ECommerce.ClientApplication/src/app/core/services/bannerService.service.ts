import { Injectable } from '@angular/core';
import { BaseService } from './baseService.service';
import { Observable, map } from 'rxjs';
import { Banner } from '../models/banner';
import { ApiResponse } from '../models/apiResponse'; 

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(private baseService: BaseService) { }

  getBanners(): Observable<Banner[]> {
 
    return this.baseService.get<ApiResponse<Banner[]>>('Banner/List').pipe(
      map(response => response.data)
    );
  }
}
