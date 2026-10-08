import http from 'k6/http'
import { sleep, check, group } from 'k6' //checks and threshold

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io'

export const options = {
    //Adding ramp up and ramp down
    stages:[
        {duration:'5s', target:5},
        {duration:'3s', target: 5},
        {duration:'5s', target:0},
    ],

    thresholds:{
        http_req_duration: ['p(95)<500']
    }
}

export default function(){
    group('Open Home Page', () =>{
        const response = http.get(BASE_URL);
        //Adding checks
    check(response,{

        'status is 200':(r) => r.status === 200,
    })
    });
    sleep(1)
}

