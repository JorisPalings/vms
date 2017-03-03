import { Injectable } from '@angular/core';
import { Meeting } from '../../_models/meeting';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetingService {
    public meetings: Meeting[];

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    getAllMeetings(): Observable<Meeting[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = { access_token: this.authenticationService.token,
                     name: this.authenticationService.email};

        return this.http
            .post('http://localhost:3000/api/meetings', data, options)
            .map((result: Response) => mapMeetings(result))
            .catch((error:any) => {
              console.log("error: ", error);
              console.log("error to json: ", error.json());

              if (error.status === 500 && error.json().error === 'No calendars selected.'){
                return Observable.throw('No calendars were selected or you have not yet integrated your Google account. You can integrate Google and add calendars under settings.');
              }

              return Observable.throw('A server error occured. Please contact the admin');


            })
    }

    setMeetings(meetings: Meeting[]){
        this.meetings = meetings;
    }

    getMeeting(id: string): Meeting {
        let meeting = <Meeting>({});
        for(var i = 0; i < this.meetings.length; i++){
            if(this.meetings[i].id == id){
                meeting = this.meetings[i];
            }
        }
        return meeting;
    }
}

function mapMeetings(response: Response): Meeting[] {
    let meetings = response.json().meetings.map(toMeeting);
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
        externals: r.externals,
        meetees: r.meetees
    });
    return meeting;
}
