import { Injectable } from '@angular/core';
import { Meeting } from '../../_models/meeting';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetingService {
    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    getAllMeetings(): Observable<Meeting[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = { access_token: this.authenticationService.token,
                     name: this.authenticationService.email};

        return this.http
            .post('http://localhost:3000/api/meetings', data, options)
            .map((result: Response) => mapMeetings(result));
    }

    getMeeting(id: number): Observable<Meeting> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = { access_token: this.authenticationService.token,
                     id: id};

        return this.http
            .post('http://localhost:3000/api/meeting', JSON.stringify(data), options)
            .map((result: Response) => toMeeting(result.json()));
    }
}

function mapMeetings(response: Response): Meeting[] {
    console.log('Mapping meetings');
    return response.json().meetings.map(toMeeting);
}

function toMeeting(r: any): Meeting {
    console.log(r);
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
    console.log('Parsed meeting: ' + meeting);
    return meeting;
}

function handleError(error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}
