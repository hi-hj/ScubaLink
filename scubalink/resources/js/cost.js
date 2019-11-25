var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });


/**Step 1 : FOC 이름 변경**/
function update_arr(){
  /**Step 1 - 비용 항목 배열**/
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var FOC_list_sum="";
  /**Step 1 - FOC 할인 항목 생성**/
  for(i=0;i<s1_input.length;i++){
    var FOC_list="<li><label class='cost_checkbox_container'>";
    FOC_list+=s1_input[i];
    FOC_list+=`<input type='checkbox' class="FOC_sale"><span class='cost_checkmark'></span></label></li>`
    FOC_list_sum+=FOC_list
  }
document.getElementById('FOC_ul').innerHTML=FOC_list_sum;
};




/**Step1 : 2. 환율 체크 시, 3. 기본 통화 리스트 추가 **/
$(document).on("change","#step1 #check_currency input",function(){
      var c_cur=$('#step1 #check_currency .cost_checkbox_container').children('input').get().map(function(el) { 
          if(el.checked==true){
            return el.labels[0].innerText;}
          });

      var text='';
      for(i=0;i<c_cur.length;i++){
        if(c_cur[i]){
          text+="<option>";
          text+=c_cur[i];
          text+="</option>"
        }
      }
      $("#c_main_cur select").html(text);
    });


/**Step1 : 강사/교육생 값 Step 2에 적용 **/
$(document).on("change","#step1 #cost_member input",function(){
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  $('#step2 .bgn_n').text(cost_ins_n[1]);
  $('#step2 .ins_n').text(cost_ins_n[0]);
})


/**Step 2 - input 변경 시 cost_arr에 기입 **/
//cost_arr : 비용 관련 배열
$(document).on("change","#step2 input",function(){

  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var cost_p1=$('#step2 .cost_p1 input').get().map(function(el) {return el.value});
  var cost_p2=$('#step2 .cost_p2 input').get().map(function(el) {return el.value});
  var cost_cur=$('#step2 .cost_p1 select').get().map(function(el) {return el.value});
  var cost_unit=$('#step2 .cost_p2 select').get().map(function(el) {return el.value});

  var cost_name = $('#step2 .cost_name').get().map(function(el) { return el.value });

  var cost_n=$('#step2 .cost_n .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_ins=$('#step2 .cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });

  var cost_foc_=$('#step2 .input_cost .label').get().map(function(el) {return el.classList.length});
  //length==2는 FOC 체크
  var cost_foc={};
  for(i=0;i<cost_n.length;i++){
    if(cost_foc_[i]==2){
      cost_foc[i]="true";
    }else{
      cost_foc[i]="false";
    }
  }


  cost_arr.splice(0,cost_arr.length);


  for(i=0;i<cost_n.length;i++){
    cost_arr.push({
      name:cost_name[i],
      p1:cost_p1[i],
      p2:cost_p2[i],
      currency:cost_cur[i],
      unit:cost_unit[i],
      n_check:cost_n[i],
      ins_check:cost_ins[i],
      check:cost_foc[i],
      per_cost:''
    })
  }


//Step2 : 비용 계산식 , cost_arr값 불러오기**/
var e="#ex_cost_";
var cur2=document.getElementsByClassName("currency2");

for(i=0;i<cost_arr.length;i++){
  var cost='';
  var ex_p1=$(e+(i+1)+' .p1');
  var ex_p2=$(e+(i+1)+' .p2');

  var ex_currency=$(e+(i+1)+' .cur');
  var ex_unit=$(e+(i+1)+' .unit');
  
  cur2[i].innerHTML=cost_arr[i].currency;

  ex_p1.text(cost_arr[i].p1);
  ex_p2.text(cost_arr[i].p2);

  ex_currency.text(cost_arr[i].currency);
  ex_unit.text(cost_arr[i].unit);

  cost=parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2);



 $('#step2 .cost').eq(i).text(cost);
 $('#step2 .cost2').eq(i).text(cost);
 
}

$('#s2_p_name text:first-child').text(cost_arr[0].name);


for(i=1;i<cost_arr.length;i++){
  $('#s2_p_name').append('<text> + </text><text>');
  $('#s2_p_name').append(cost_arr[i].name);
  $('#s2_p_name').append('</text>');
}


});


















/**Step 1 - 비용 추가**/
function add_div(){
  var div = document.createElement('div');
  div.innerHTML = document.getElementById('room_type').innerHTML;
  document.getElementById('field').appendChild(div);

    /**FOC 항목 재설정**/
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var FOC_list_sum="";
  for(i=0;i<s1_input.length;i++){
    var FOC_list="<li><label class='cost_checkbox_container'>";
    FOC_list+=s1_input[i];
    FOC_list+=`<input type='checkbox' class="FOC_sale"><span class='cost_checkmark'></span></label></li>`
    FOC_list_sum+=FOC_list
  }
document.getElementById('FOC_ul').innerHTML=FOC_list_sum;
}
/**Step 1 : 비용 삭제 **/
function remove_div(obj){
  document.getElementById('field').removeChild(obj.parentNode.parentNode);
  /**FOC 항목 재설정**/
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var FOC_list_sum="";
  for(i=0;i<s1_input.length;i++){
    var FOC_list="<li><label class='cost_checkbox_container'>";
    FOC_list+=s1_input[i];
    FOC_list+=`<input type='checkbox' class="FOC_sale"><span class='cost_checkmark'></span></label></li>`
    FOC_list_sum+=FOC_list
  }
document.getElementById('FOC_ul').innerHTML=FOC_list_sum;

}

/**Step1 : 첫 항목 이름 '다이빙' 적용**/
$(document).ready(function () {
    $('#room_type input.cost_name').val("다이빙");
  });  

var cost_arr=new Array();


/**Step 1 : 배열 및 FOC 체크 상태 Update **/
$(document).on("change","#step1 #FOC_ul input",function(){
  cost_arr_s1.splice(0,cost_arr_s1.length);
  var FOC_check=$('#FOC_ul .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_name=$('#FOC_ul .cost_checkbox_container').get().map(function(el) { return el.outerText });

  for(i=0;i<FOC_check.length;i++){
  var cost={name:"", check:""}
  cost.name=cost_name[i];

  if(FOC_check[i]){
    cost.check="true";
  }else{
    cost.check="false";
  }
  cost_arr_s1.push(cost);
  }
});





/**Step 1에만 적용되는 배열 cost_arr_s1**/
var cost_arr_s1=new Array();

function update_s1(){
  var FOC_sale=$('.FOC_sale');
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  if(FOC_sale.length!=0){
  cost_arr_s1.splice(0,cost_arr_s1.length);
  /**check가 항상 true로 return되어 추가됨. checked로 대체함**/
  for(i=0;i<FOC_sale.length;i++){
    if($(FOC_sale).eq(i).is(":checked")){
    cost_arr_s1.push({name:s1_input[i], check:"true"});
  }
  else{
    cost_arr_s1.push({name:s1_input[i], check:"false"});
  }}}}




/**Step 1 -> Step 2 비용 항목 복사 **/
function s1_to_s2(){
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });

//변경값이 있을 경우만 작동
if(s1_input!==s2_input){
  /**첫 번째 항목만 예외로 적용**/
  $('#step2 #c_first input.cost_name').val(s1_input[0]);
   if(cost_arr_s1[0].check==="true"){
    $('#step2 #c_first div.label-default').removeClass('hide');
  }else{
    $('#step2 #c_first div.label-default').addClass('hide');
  }
  var s_div="";



  for(i=1;i<cost_arr_s1.length;i++){
  var div ="";
  div='<div><div class="input_cost">';
  div+=`<div class="label label-default`
  
  if(cost_arr_s1[i].check==="true"){
    div+=`">FOC 할인</div>`
  }else{
    div+=` hide">FOC 할인</div>`
  }
  div+=`<div class="s2_div">`
  div+=document.getElementById('c_first').getElementsByClassName('s2_div')[0].innerHTML;
  div+='</div></div>';

  div+="<div class='ex_cost'>";
  div+="<div id='ex_cost_";
  div+=i+1;
  div+="' class='collapse'>";
  div+=`<div class=""></div><span class="check1 hide">강사비용지원 체크 시</span>
            <span class="check2 hide">공동비용지원 체크 시</span>
            <span class="check3 hide">공동비용, 강사비용지원 체크 시</span>`

  div+=`<div>1인 비용</div>

            
            <span>= 단가 x 횟수</span>
            <span class="check_1"> /교육생 수</span>
            <span class="check_2 hide"> +(단가 x 횟수)/교육생 수</span>
            <span class="check_3 hide"> /(교육생 수 + 강사 수)</span>




            <div>=
              <text class="p1"></text>
              <text class="cur"></text>
              <text> x </text>
              <text class="p2"></text>
              <text class="unit"></text>


              <span class="check_1">
                <text>/</text>
                <text class="bgn_n"></text>
                <text>명</text>
              </span>


              <span class="hide check_2">
                <text>+</text>
                <text class="p1"></text>
                <text class="cur"></text>
                <text>x</text>
                <text class="p2"></text>
                <text class="unit"></text>
                <text>/</text>
                <text class="bgn_n"></text>
                <text>명</text>
              </span>


              <span class="hide check_3">
                <text>/</text>
                <text class="bgn_n"></text>
                <text>명</text>
                <text>+</text>
                <text class="ins_n"></text>
                <text>명</text>
              </span>


              <br>
              <text> = </text>
              <text class="cost">40,600</text>
              <text class="cur"></text>

             
            </div>



        </div>`
  div+='<div class="accordion-toggle" data-toggle="collapse" data-target="#ex_cost_';
  div+=i+1;
  div+='">1인 비용 = <text class="cost2"></text><text class="currency2"></text>';
  div+='<i><img src="../resources/img/ic-arrow-ltr.svg" class="arrow-bottom"></i></div></div></div>';

  var s_div = s_div + div;
}

  /**s_div에 html 복사 후 삽입(첫 항목만 제외)**/
  document.getElementById('c_sibling').innerHTML=s_div;
  /**삽입한 html에 value 복사 **/

  for(i=1;i<s1_input.length;i++){
    $('#step2 input.cost_name').eq(i).val(s1_input[i]);
  }

  for(i=0;i<s1_input.length;i++){
    if(cost_arr.length!=0){
    $('.cost_p1 input').eq(i).val(cost_arr[i].p1);
    $('.cost_p2 input').eq(i).val(cost_arr[i].p2);
    $('.cost_p1 select').eq(i).val(cost_arr[i].currency);
    $('.cost_p2 select').eq(i).val(cost_arr[i].unit);
    if(cost_arr[i].n_check){
    $('.cost_n input[type="checkbox"]').eq(i).prop('checked',true);
    }
    if(cost_arr[i].ins_check){
    $('.cost_ins input[type="checkbox"]').eq(i).prop('checked',true);
    }
}


/**Step1-FOC 체크 시, Step2 공동 비용 처리**/
    if(cost_arr_s1[i].check=="true"){
      $('.cost_ins input[type="checkbox"]').eq(i).attr('disabled',true);
      $('.cost_ins input[type="checkbox"]').eq(i).prop('checked',false);
      $('.cost_ins').eq(i).css("opacity","0.3");
    }else{
      $('.cost_ins input[type="checkbox"]').eq(i).attr('disabled',false);
      $('.cost_ins').eq(i).css("opacity","1.0");
    }
  }

  }


}


 





/** Step 1 : 통화 checkbox 체크 시 세부 내용 on/off **/

$(document).on("change","#step1 .cost_checkbox_container input",function(){
  var div= $(this).closest("label").next();
    if($(this).is(":checked")) {
        div.removeClass("hide");
    } else {
        div.addClass("hide");
    }
})


/* Step2 : 비용 추가 (삭제함)
function add_div_s2(){
  if(s1_input!==s2_input){

  var c_array = $('#step2 .input_cost').length;
  var div ="";
  div='<div><div class="input_cost">';
  div+=`<div class="label label-default hide">FOC 할인</div>`;
  div+=document.getElementById('c_first').getElementsByClassName('s2_div')[0].innerHTML;
  div+='</div></div>';
  div+="<div class='ex_cost'>";
  div+="<div id='ex_cost_";
  div+=c_array+1;
  div+="' class='collapse'>";
  div+=`<span class="check1 hide">강사비용지원 체크 시</span>
            <span class="check2 hide">공동비용지원 체크 시</span>
            <span class="check3 hide">공동비용, 강사비용지원 체크 시</span>`
  div+="1인 비용 = 단가x횟수<br>=20,3000 x 2 = 40,600</div>";
  div+='<div class="accordion-toggle" data-toggle="collapse" data-target="#ex_cost_';
  div+=c_array+1;
  div+='">다이빙 3회 = 40,600';
  div+='<i><img src="../resources/img/ic-arrow-ltr.svg" class="arrow-bottom"></i></div></div>';
  
  var box=document.createElement('div');
  box.innerHTML=div;
  document.getElementById('c_sibling').appendChild(box);
  }

}
*/

/* Step2 : 비용 삭제 (삭제함)
function remove_div_s2(obj){
  document.getElementById('c_sibling').removeChild(obj.parentNode.parentNode.parentNode.parentNode);
}
*/



// Step 2 -> Step 3(디자인/기획 변경)
function s2_to_s3(){
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });

  var cost_ins="";
  var cost_no_s="";

  for(i=0;i<s2_input.length;i++){
  var li="";
  li+=`<li>
            <label class="cost_checkbox_container">`
  li+=s2_input[i];
  li+=`<input type="checkbox">
              <span class="cost_checkmark"></span>
            </label>
            
            <div class="custom hide">
              <input type="number" placeholder="0" value="`
  li+=30000;
  li+=`"><span class="c_text">`
  li+=`엔`;
  li+=`</span><div>일반 가격 : 20,300엔</div></div></li>`

  cost_ins = cost_ins + li;
}


  for(i=0;i<s2_input.length;i++){
  li=`<li>
  <label class="cost_checkbox_container">`
  li+=s2_input[i];
  li+=`<input type="checkbox">
        <span class="cost_checkmark"></span>
        </label>
        <div class="custom hide">
          <div>2,500엔 x 3박 = 7,500엔</div>
        </div>
      </li>`
  cost_no_s +=li;
}


/**Step 3 복사**/
  $('#cost_ins ul').html(cost_ins);
  $('#cost_no_s ul').html(cost_no_s);
}






/** Step2 : 공동 비용, 강사 포함 비용(checbox) 변경 시 작동**/

$(document).on("change","#step2 .cost_check_box_1 input",function(){
  var cost_n=$('.cost_n input').get().map(function(el) { return el.checked});
  var cost_ins=$('.cost_ins input').get().map(function(el) {return el.checked});
  var c_check_1=$('.ex_cost .collapse .check1');
  var c_check_2=$('.ex_cost .collapse .check2');
  var c_check_3=$('.ex_cost .collapse .check3');

var e="#ex_cost_"
var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});

  for(i=0;i<=cost_n.length;i++){

    var check_1=$(e+(i+1)+' .check_1');
    var check_2=$(e+(i+1)+' .check_2');
    var check_3=$(e+(i+1)+' .check_3');
    var cost=''
    /**모두 클릭**/
    if((cost_n[i])&&(cost_ins[i])){
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).removeClass('hide');

      check_1.addClass('hide');
      check_2.addClass('hide');
      check_3.removeClass('hide');
    
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));
      

    }else if((!cost_n[i])&&(cost_ins[i])){
      /**강사비용지원만 체크**/
      c_check_1.eq(i).removeClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.removeClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
    }else if((cost_n[i])&&(!cost_ins[i])){
      /**공동비용지원 체크**/
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).removeClass('hide');
      c_check_3.eq(i).addClass('hide');


      check_1.addClass('hide');
      check_2.removeClass('hide');
      check_3.addClass('hide');
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1])*(parseInt(cost_ins_n[1])+1));
    }

    else{
      /**모두 미 체크시**/
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.addClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2));
    }


    $('#step2 .cost').eq(i).text(cost);
    $('#step2 .cost2').eq(i).text(cost);
    cost_arr[i].per_cost=cost;
    console.log(cost_arr[i].per_cost);
  }

})










/** Step 2 -> Step 1 **/
function s2_to_s1(){
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });

  var FOC_list_sum="";

  if(s2_input!=s1_input){
    $('#room_type input.cost_name').val(s2_input[0]);

    var s_div="";
    for(i=1;i<s2_input.length;i++){
      var div=`<div class="input_cost">
                <div>
                  <input type="text" class="cost_name" placeholder="비용을 입력해주세요"
                  value="`
          div+=s2_input[i];
          div+=`" onkeyup="update_arr()">
                <i class="glyphicon glyphicon-pencil"></i>
                <span class="remove_div btn" onclick="remove_div(this)"><img src="../resources/img/ic-close.svg"></span> 
                </div>
                </div>
                `
        var s_div = s_div+div;
      }
      document.getElementById('field').innerHTML=s_div;

      /**Step 1 - FOC 할인 항목도 동일하게 복사**/
      for(i=0;i<s2_input.length;i++){
        var FOC_list="<li><label class='cost_checkbox_container'>";
        FOC_list+=s2_input[i];
        FOC_list+="<input type='checkbox'"
          if(cost_arr_s1[i].check==="true"){
            FOC_list+=`checked>`
          }else{
            FOC_list+=`'>`
          }
        FOC_list+="<span class='cost_checkmark'></span></label></li>"
        FOC_list_sum+=FOC_list
      }

      document.getElementById('FOC_ul').innerHTML=FOC_list_sum;
    }
  }

/** Step 3 - 비용 추가/삭제 **/
function add_div_s3(){
  var div = document.createElement('div');
  div.innerHTML = document.getElementById('c_extra_first').innerHTML;
  document.getElementById('c_extra_sibling').appendChild(div);
}

function remove_div_s3(obj){
  document.getElementById('c_extra_sibling').removeChild(obj.parentNode.parentNode.parentNode);
}




/** Step 3 - radio 체크 시 div on/off **/

$(document).on("change","#step3 .cost_checkbox_container input",function(){
  var div= $(this).closest("label").next();
    if($(this).is(":checked")) {
        div.removeClass("hide");
    } else {
        div.addClass("hide");
    }
})





/** 비용 - form wizard **/
$(document).ready(function () {

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });



});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}











