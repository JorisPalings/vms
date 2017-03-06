import { Injectable } from '@angular/core';
import { Project } from '../../_models/project';
import { Meeting } from '../../_models/meeting';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
    public projects: Project[];

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    getAllProjects(): Observable<Project[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = {
            access_token: this.authenticationService.token
        };

        return this.http
            .post('http://localhost:3000/api/projects', data, options)
            .map((result: Response) => mapProjects(result))
            .catch((error: any) => {
                console.log("error: ", error);
                console.log("error to json: ", error.json());

                if (error.status === 500 && (error.json().error === 'No calendars selected.' || error.json().error === 'Google not integrated.')) {
                    return Observable.throw('No calendars were selected or you have not yet integrated your Google account. You can integrate Google and add calendars under settings.');
                }

                return Observable.throw('A server error occured. Please contact the admin');


            })
    }

    getNotesForMeetingForProject(id: string){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let data = {
          access_token: this.authenticationService.token,
          id: id
      }

      return this.http
          .post('http://localhost:3000/api/notesOfMeetingsFromProject', data, options)
          .map((result: Response) => result.json())
          .catch((error: any) => {
              console.log("error: ", error);
              console.log("error to json: ", error.json());

              if (error.status === 500 && (error.json().error === 'No calendars selected.' || error.json().error === 'Google not integrated.')) {
                  return Observable.throw('No calendars were selected or you have not yet integrated your Google account. You can integrate Google and add calendars under settings.');
              }

              return Observable.throw('A server error occured. Please contact the admin');
          })


    }

    getMeetingsForProject(id: string): Observable<Meeting[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = {
            access_token: this.authenticationService.token,
            id: id
        };

        return this.http
            .post('http://localhost:3000/api/meetingsForProject', data, options)
            .map((result: Response) => mapMeetings(result))
            .catch((error: any) => {
                console.log("error: ", error);
                console.log("error to json: ", error.json());

                if (error.status === 500 && (error.json().error === 'No calendars selected.' || error.json().error === 'Google not integrated.')) {
                    return Observable.throw('No calendars were selected or you have not yet integrated your Google account. You can integrate Google and add calendars under settings.');
                }

                return Observable.throw('A server error occured. Please contact the admin');
            })
    }
}

function mapProjects(response: Response): Project[] {
    let projects = response.json().map(toProject);
    return projects;
}

function toProject(r: any): Project {
    let project = <Project>({
        id: r.id,
        tag: r.tag,
        name: r.name
    });
    return project;
}

function mapMeetings(response: Response): Meeting[] {
    let meetings = response.json().map(toMeeting);
    return meetings;
}

function toMeeting(r: any): Meeting {
    let meeting = <Meeting>({
        id: r.id,
        externalID: r.externalId,
        start: r.start,
        end: r.end,
        summary: r.summary,
        room: r.room,
        externals: [],
        meetees: [],
        projectId: r.projectId
    });
    return meeting;
}
