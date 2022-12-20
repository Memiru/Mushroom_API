$(function(){
    $("input[name='api_key']").val(localStorage.api_key);

    var today = new Date();

    $("input[name='api_date']").val(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate()-1));
})

$("#btn1").click(function(){
    localStorage.setItem("api_key",$("input[name='api_key']").val());

    $.ajax({
        url:"/test",
        type:"get",
        data:$("form[name='api_form']").serialize(),
        success:function(result){
            if(result.cube_histories.length>0){
                $("#total_cnt").empty().append(result.count+"건");

                $("#view_area").empty();
                result.cube_histories.forEach(function(e,i){

                    let before_cube  = "<ul>",
                        after_cube = "<ul>";

                    if(e.cube_type ==="에디셔널 큐브"){
                        e.before_additional_potential_options.forEach(function(e2,i2){
                            before_cube+="<li>"+e2.grade+" / "+e2.value+"</li>";
                        })
                        before_cube+= "</ul>";

                        e.after_additional_potential_options.forEach(function(e2,i2){
                            after_cube+="<li>"+e2.grade+" / "+e2.value+"</li>";
                        })
                        after_cube+= "</ul>";
                    }else{
                        e.before_potential_options.forEach(function(e2,i2){

                            before_cube+="<li>"+e2.grade+" / "+e2.value+"</li>";
                        })
                        before_cube+= "</ul>";

                        e.after_potential_options.forEach(function(e2,i2){

                            after_cube+="<li>"+e2.grade+" / "+e2.value+"</li>";
                        })
                        after_cube+= "</ul>";
                    }



                    $("#view_area").append(
                        "<ul>"+
                        "<li>캐릭명: "+e.character_name+"</li>"+
                        "<li>큐브시간: "+e.create_date+"</li>"+
                        "<li>큐브종류: "+e.cube_type+"</li>"+
                        "<li>등급: "+e.potential_option_grade+"</li>"+
                        "<li>에디셔널 등급: "+e.additional_potential_option_grade+"</li>"+
                        "<li>아이템: "+e.target_item+"</li>"+
                        "<li>큐브전: "+before_cube+"</li>"+
                        "<li>큐브후: "+after_cube+"</li>"+
                        "</ui>"
                    );
                });
            }else{
                alert("조회된 데이터가 존재하지 않습니다.");
            }
        }
    })
});