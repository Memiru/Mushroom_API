import moment from 'moment';
import axios from "axios";

axios.defaults.withCredentials = true;

export const apiResult = (api_key) =>{
    return api_loop(api_key);
}

const api_loop = async (api_key) => {
    let api_count = 1000;

    //시작일, 종료일, 오늘날짜, 대상날짜
    let start_date = "2022-11-24";
    // let start_date = "2022-12-15";
    // let end_date = "2022-12-17";
    let end_date = moment().format("YYYY-MM-DD");
    let target_date = "2022-11-25";
    // let target_date = "2022-12-16";

    let resultArr = [];

    while (moment(target_date).isBetween(start_date, end_date)) {
        let apiResult = await apiConnect(api_key, api_count, target_date);
        let next_cursor = apiResult.next_cursor;

        let nextArr = [];
        while(next_cursor!==""){
            let apiCursorResult = await apiCursor(api_key, api_count, target_date, next_cursor);
            nextArr.push(apiCursorResult);

            next_cursor = apiCursorResult.next_cursor;
        }
        if(nextArr.length!==0){
            resultArr.push(apiCursorDataCompress(apiResult, nextArr));
        }else{
            resultArr.push(apiResult);
        }

        target_date = moment(target_date).add(1, 'days').format("YYYY-MM-DD");
    }
    return resultArr;
}

const apiConnect = async (api_key, api_count, target_date) => {

    try {
        const responce = await axios.get("/openapi/maplestory/v1/cube-use-results",
            {
                headers: {'Authorization': api_key},
                params: {
                    count: api_count,
                    date: target_date,
                    cursor: '',
                },
            }
        );
        responce.data.date = target_date;

        return responce.data;
    } catch (e) {
        console.log(e)
    }

}

const apiCursor = async (api_key, api_count, target_date, next_cursor) =>{
    try {
        const responce = await axios.get("/openapi/maplestory/v1/cube-use-results",
            {
                headers: {'Authorization': api_key},
                params: {
                    count: api_count,
                    date: '',
                    cursor: next_cursor,
                },
            }
        );
        responce.data.date = target_date;

        return responce.data;
    } catch (e) {
        console.log(e)
    }
}

const apiCursorDataCompress = (apiResult, nextArr) =>{

    let compress = JSON.parse(JSON.stringify(apiResult));

    nextArr.forEach((el) =>{
        compress.count += el.count;
        compress.cube_histories.push(...el.cube_histories);
        compress.next_cursor = "";
    })

    return compress;
}