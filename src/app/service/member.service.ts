import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Member} from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private apiUrl = environment.apiUrl;

  // get all member
  public getAllMember(): Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${this.apiUrl}/members`);
  }
  // get member by id
  public getMemberById(id: number): Observable<Member | null>{
    return this.httpClient.get<Member | null>(`${this.apiUrl}/member/${id}`);
  }
  // get member by nid
  public getMemberByNid(nid: number): Observable<Member | null>{
    return this.httpClient.get<Member | null>(`${this.apiUrl}/memberByNid/${nid}`)
  }
  // post all member
  public postAllMember(members: Member[]): Observable<Member[]>{
    return this.httpClient.post<Member[]>(`${this.apiUrl}/members`, members);
  }
  // post one member
  public postOneMember(member: Member): Observable<Member | null>{
    return this.httpClient.post<Member | null>(`${this.apiUrl}/member`, member);
  }
  // delete member by id
  public deleteMemberById(id: number): Observable<string>{
    return this.httpClient.delete<string>(`${this.apiUrl}/member/${id}`);
  }
  // delete member by obj
  public deleteMemberByObj(member: Member): Observable<string>{
    const header = new Headers();
    const body = member;
    const responseType = 'text';
    const withCredentials = false;
    const reportProgress = false;

    header.append('Content-Type', 'json');

    const  option = {
      header,
      body,
      reportProgress,
      responseType,
      withCredentials
    };
    // @ts-ignore
    return this.httpClient.delete<string>(`${this.apiUrl}/member`, option);
  }
  // update member by obj
  public updateMemberByObj(member: Member): Observable<Member | null>{
    return this.httpClient.put<Member | null>(`${this.apiUrl}/member`, member);
  }
}
