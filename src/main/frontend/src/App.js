import React, {Fragment, useState, useEffect} from 'react';
import * as keySetting from "./js/keySetting";
import * as cubeCalc from "./js/cubeCalc";

import miracle_cube  from "./img/miracle.png";
import red_cube  from "./img/red.png";
import black_cube  from "./img/black.png";
import addi_cube  from "./img/addi.png";

import "./css/reset.css";
import "./css/font.css";
import "./css/main.css";

export const App = () => {
    //API_key
    const [defaultKey, setDefaultKey] = useState('');
    //View 상태
    const [status, setStatus] = useState('');

    //큐브 결과
    const [cubeResult, setCubeResult] = useState({});

    //큐브 건수
    const [cubeCnt, setCubeCnt] = useState({});
    //상세보기 팝업
    const [historyPopup, setHistoryPopup] = useState(false);

    //상세보기 큐브 리스트
    const [historyDetail, setHistoryDetail] = useState('');

    //상세보기 - 큐브 필터
    // const [cubeView, setCubeView] = useState('');

    //init
    useEffect(() =>{
        setStatus('key_insert');
        // setCubeView('all');
        setHistoryPopup(false);
        setDefaultKey(keySetting.defaultKey);
    }, [])

    //Key 전송
    const formSubmit = async (event) => {
        let api_key = event.target.api_key.value;
        if(api_key!==""){
            setStatus('loading');
            event.preventDefault();

            const result = cubeCalc.cubeJson(await keySetting.keyTransfer(api_key));
            console.log(result);

            setCubeResult(result);
            setCubeCnt(result.cube_cnt);
            setStatus('result');
        }else{
            alert("API Key를 입력해주세요");
        }
    }

    const viewHistory = (histories) => {
        setHistoryPopup(true);
        setHistoryDetail(historyDraw(histories));
    }

    const historyDraw = (histories) => {
        let cubes = histories.cube_histories;
        console.log(cubes);

        return(
            <>
                <div className="table-box-wrap">
                    <div className="table-box">
                        <table className="popupTable">
                            <colgroup>
                                <col width="120px"/>
                                <col width="250px"/>
                                <col width="150px"/>
                                <col width="80px"/>
                                <col width="80px"/>
                                <col width="*"/>
                                <col width="*"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th width="120px">캐릭명</th>
                                <th width="250px">아이템</th>
                                <th width="150px">큐브종류</th>
                                <th width="80px">등급</th>
                                <th width="80px">시간</th>
                                <th>옵션(전)</th>
                                <th>옵션(후)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cubes.map((el)=>
                                <tr className={el.cube_type_eng+"_cube_line"} key={el.create_date}>
                                    <td>{el.character_name}</td>
                                    <td>{el.target_item}</td>
                                    <td>{el.cube_type}</td>
                                    <td>{el.cube_rank}</td>
                                    <td>{el.create_date}</td>
                                    <td>
                                        {el.cube_before.map((options)=>
                                            options.split('\n').map(line=>{
                                                return (<span key={line}>{line}<br /></span>);
                                            })
                                        )}
                                    </td>
                                    <td>
                                        {el.cube_after.map((options)=>
                                            options.split('\n').map(line=>{
                                                return (<span key={line}>{line}<br /></span>);
                                            })
                                        )}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    const historyList = (type) => {
        // setCubeView(type);
    }

    const closePopup = () => {
        setHistoryPopup(false);
    }

    return (
        <Fragment>
            <div className="header">
                <h2>사용결과</h2>
            </div>

            {status === 'key_insert'  ?
                <div className="center_box">
                    <form onSubmit={formSubmit}>
                        <h4>API Key </h4>
                        <textarea name="api_key" defaultValue={defaultKey}></textarea>
                        <div className="btn_div">
                            <button type="submit" className="formBtn" id="btn1">Key 전송</button>
                        </div>
                    </form>
                </div>: null}

            {status === 'loading' ? <div id="loading" className="spinner"></div> : null}

            {status === 'result'  ?
                <div className="result_box">
                    <div id="view_area">
                        <div className="total_view">
                            전체 {cubeResult.total_cubes.total_cube}개 <br/>
                            레드 큐브 {cubeResult.total_cubes.red_cube}개 <br/>
                            블랙 큐브 {cubeResult.total_cubes.black_cube}개 <br/>
                            에디셔널 큐브 {cubeResult.total_cubes.addi_cube}개
                        </div>
                        <div className="day_view">
                            {cubeCnt.map((el)=>
                                <ul key={el} onClick={() => viewHistory(el.histories)}>
                                    <li>{el.date}</li>
                                    <li>전체<br/>{el.total_cube}</li>
                                    <li>레드 큐브<br/>{el.red_cube}</li>
                                    <li>블랙 큐브<br/>{el.black_cube}</li>
                                    <li>에디셔널 큐브<br/>{el.addi_cube}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>: null}

            {historyPopup?
                <>
                    <div className="modalPopup">
                        <div className="modalPopup_background"></div>
                        <div className="modalPopup_content">
                            <div className="popupDiv">
                                <div className="cube_img_layer">
                                    <img src={miracle_cube} onClick={() => historyList("all")} alt="전체보기" className="cube_imgs" />
                                    <img src={red_cube} onClick={() => historyList("red")} alt="레드 큐브" className="cube_imgs" />
                                    <img src={black_cube} onClick={() => historyList("black")} alt="블랙 큐브" className="cube_imgs" />
                                    <img src={addi_cube} onClick={() => historyList("addi")} alt="에디셔널 큐브" className="cube_imgs" />
                                </div>
                                {historyDetail}
                            </div>
                            <div className="btn_div">
                                <button onClick={closePopup}>닫기</button>
                            </div>
                        </div>
                    </div>
                </>
                :null}

            <div className="footer">
                <div>
                    <font>Data based on NEXON DEVELOPERS</font><br/>
                    https://github.com/Memiru/Mushroom_API <br/>
                </div>
            </div>
            <footer></footer>
        </Fragment>
    );
}

export default App;
