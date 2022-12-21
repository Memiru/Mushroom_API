import moment from 'moment';

export const cubeJson = (param) => {
    const total_cubes = {total_cube: 0, red_cube: 0, black_cube: 0, addi_cube: 0};

    const cube_cnt = [];

    param.forEach((el) =>{
        const cubes = {total_cube: 0, red_cube: 0, black_cube: 0, addi_cube: 0};
        cubeCalc(total_cubes, cubes, el);
        cubes.date = el.date;
        cubes.histories = cubeDetail(el.cube_histories);

        console.log(el)

        cube_cnt.push(JSON.parse(JSON.stringify(cubes)));
    });

    return {total_cubes: total_cubes, cube_cnt:cube_cnt};
}

const cubeCalc = (total_cubes, cubes, param) =>{
    total_cubes.total_cube += (param.count!==undefined?param.count:0);
    cubes.total_cube += (param.count!==undefined?param.count:0);

    param.cube_histories.forEach((cube) =>{
        switch (cube.cube_type){
            case "레드 큐브":
                total_cubes.red_cube += 1;
                cubes.red_cube += 1;
                break;
            case "블랙 큐브":
                total_cubes.black_cube += 1;
                cubes.black_cube += 1;
                break;
            case "에디셔널 큐브":
                total_cubes.addi_cube += 1;
                cubes.addi_cube += 1;
                break;
            default:
                break;
        }
    });

    return cubes;
}

const cubeDetail = (param) =>{
    let cube_history = {cube_histories:[]};


    param.forEach((cube) =>{
        let default_info = {character_name:"", cube_type:"", create_date:"", target_item:"", cube_before:[], cube_after:[], cube_rank:"", item_upgrade:"", miracle:""}
        default_info.character_name = cube.character_name;
        default_info.create_date = moment(cube.create_date).format("hh:mm:ss");
        default_info.target_item = cube.target_item;
        default_info.miracle = cube.miracle_time_flag;
        default_info.item_upgrade = cube.item_upgrade_result;

        const cube_before = default_info.cube_before;
        const cube_after = default_info.cube_after;

        if(cube.cube_type==="에디셔널 큐브"){
            default_info.cube_rank = cube.additional_potential_option_grade;
            cube.before_additional_potential_options.forEach((el) => {
                cube_before.push(el.value + " / " + el.grade)
            });
            cube.after_additional_potential_options.forEach((el) => {
                cube_after.push(el.value + " / " + el.grade)
            });
        }else{
            default_info.cube_rank = cube.potential_option_grade;
            cube.before_potential_options.forEach((el) => {
                cube_before.push(el.value + " / " + el.grade)
            });
            cube.after_potential_options.forEach((el) => {
                cube_after.push(el.value + " / " + el.grade)
            });
        }

        switch (cube.cube_type){
            case "레드 큐브":
                default_info.cube_type = cube.cube_type;
                default_info.cube_type_eng = "red";
                cube_history.cube_histories.push(default_info);
                break;
            case "블랙 큐브":
                default_info.cube_type = cube.cube_type;
                default_info.cube_type_eng = "black";
                cube_history.cube_histories.push(default_info);
                break;
            case "에디셔널 큐브":
                default_info.cube_type = cube.cube_type;
                default_info.cube_type_eng = "addi";
                cube_history.cube_histories.push(default_info);
                break;
            default:
                break;
        }
    });

    return cube_history;
}