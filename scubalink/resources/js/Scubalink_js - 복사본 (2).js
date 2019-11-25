/** li 어디에 해당하는 클래스인지 몰라서 일단 주석 처리
//side bar 클릭 시, 메뉴 토글 됨.
  $('li').on('click', function(){
  $('li').removeClass('active');
  $(this).toggleClass('active');
});
**/
// overlay 메뉴 버튼 클릭 시 on/off

/**tour-cost-explanation, 더보기 클릭 시 화살표 변경 **/
$("#read_toggle").click(function(){
if($(this).hasClass('btn collapsed')){



  $('#read_toggle_1').addClass('hidden');
  $('#read_toggle_1_text').addClass('hidden');

  $('#read_toggle_2').removeClass('hidden');
  $('#read_toggle_2_text').removeClass('hidden');
}
else{

  $('#read_toggle_2').addClass('hidden');
  $('#read_toggle_2_text').addClass('hidden');
  $('#read_toggle_1').removeClass('hidden');
  $('#read_toggle_1_text').removeClass('hidden');
}
});


function on() {
    document.getElementById("overlay").style.display = "block";
};

function off() {
    document.getElementById("overlay").style.display = "none";
};


/**home-menu-myBGN의 초대링크 복사 toast message 버튼 **/

function toastMessage() {
    var x = document.getElementById("toastMessage");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//순서를 바꾸니 정상 작동 된다
//document.ready 이해하고 다시 적용하기
//자격증 편집 화면에서 이미지 업로드 preview
 $(document).ready( function() {
      $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if( input.length ) {
            input.val(log);

        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
                $('#img-upload').addClass("on");

            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    });

    $("#img-upload").click(function(){
      $("#imgInp").trigger("click");
    });
    $("#camera_img").click(function(){
      $("#imgInp").trigger("click");
    });


  });
/**menu-license-add, 직접입력 선택 시, input box 생성- 교육단체,교육과정 **/
function showfield1(name){
  if(name=='Other')document.getElementById('direct_input_0').innerHTML='<input type="text" name="other" placeholder="직접입력"/>';
  else document.getElementById('direct_input_0').innerHTML='';
};

function showfield2(name){
  if(name=='Other')document.getElementById('direct_input_1').innerHTML='<input type="text" name="other" placeholder="직접입력"/>';
  else document.getElementById('direct_input_1').innerHTML='';
};


 /**tour-cost-explanation, 직접입력 선택 시select. input text 나오게함 **/
 $(document).ready(function(){

      //직접입력 인풋박스 기존에는 숨어있다가
// $('.selboxDirect').hide();

$('.selbox').each(function(){
  $(this).change(function() {
                //직접입력을 누를 때 나타남
    if($(this).val() == "direct" || $(this).val() == "6") {
      $(this).next().show();
    }  else {
      $(this).next().hide();
    }
  });
});
});


/**tour-cost-explanation, 비용 추가를 해도, selbox입력창 보이게**/
$('#plus_cost').bind('click', function(){
  var i=$('.input_cost').length;
  $('input.selboxDirect:eq(i-1)').hide();
  /**
  $('#field input.selboxDirect').hide();
  **/


$('#field select.selbox').bind('change',function(){

  if($(this).val()=="direct" || $(this).val()=="6"){
    $(this).next().show();
  }
  else{
    $(this).next().hide();
  }
});


  });





/** textarea 자동 크기 조절 **/

$("textarea.autosize").on('keydown keyup', function () {
  $(this).height(1).height( $(this).prop('scrollHeight')+12 );
});

$("textarea.autosize_0").on('keydown keyup', function () {
  $(this).height(1).height( $(this).prop('scrollHeight')+1 );
});

$('#tour_comment').on('change keyup keydown paste cut input', 'textarea', function () {
    $(this).height(0).height(this.scrollHeight);
}).find('textarea').change();

$('#tour_comment').on('change keyup keydown paste cut input', 'textarea', function () {
    var t_h=$(this).prop('scrollHeight');
    $('#tour_comment button').height(t_h);
    $('#tour_comment').height(t_h);
});

$(document).ready(function() {
    $('#tour_comment button').attr('disabled', true);

    $('#tour_comment textarea').on('keyup',function() {
        var textarea_value = $(this).val();


        if(textarea_value != '') {
            $('#tour_comment button').attr('disabled', false);
        } else {
            $('#tour_comment button').attr('disabled', true);
        }
    });
});

/**home-search, input_val 체크하여 reset버튼 on-off **/

function checkForInput(element) {
  // element is passed to the function ^

  const $button = $(element).siblings('button:reset');

  if ($(element).val().length > 0) {
    $button.removeClass('hidden');
  } else {
    $button.addClass('hidden');
  }
}

// The lines below are executed on page load
$('.search_INS input:text').each(function() {
  checkForInput(this);
});

// The lines below (inside) are executed on change & keyup
$('.search_INS input:text').on('change keyup', function() {
  checkForInput(this);
});




/**tour_schedule -textarea 입력 시, 저장 버튼 disable 조정**/
$(document).ready(function() {
    $('#save').attr('disabled', true);

    $('textarea').on('keyup',function() {
        var textarea_value = $("#tour_detail").val();


        if(textarea_value != '') {
            $('#save').attr('disabled', false);
        } else {
            $('#save').attr('disabled', true);
        }
    });
});



/**text 더 보기 ** home-profile-INS**/
$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 50;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = '<img src="/img/ic-arrow-ltr.svg" style="transform:rotate(90deg)">';
    var lesstext = '<img src="/img/ic-arrow-ltr.svg" style="transform:rotate(270deg)">';


    $('.more').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});

/**tour_INS/BGN 참석자 radio 체크 시, label/text/span 설정**/
/*
$(document).ready(function(){
    //변수 설정
    var radio_left=$('#switch_3_left');
    var radio_right=$('#switch_3_right');
    var radio_center=$('#switch_3_center');

    var label_left=$('#switch_3_left_l');
    var label_right=$('#switch_3_right_l');
    var label_center=$('#switch_3_center_l');

    //label 클릭 시 설정
  $('input').on('click',function () {
        if (radio_left.is(':checked')) {
            label_left.addClass("blue");}
            else{
              label_left.removeClass("blue");
            }

        if (radio_right.is(':checked')) {
            label_right.addClass("blue");}
            else{
              label_right.removeClass("blue");
            }

        if (radio_center.is(':checked')) {
            label_center.addClass("blue");}
            else{
              label_center.removeClass("blue");
            }
        });
      });
*/

/**tour_INS/BGN 참석자 radio 체크 시, text/span 설정**/
// $(document).ready(function(){
//
//    //text, span 설정
//   $('#tour_attend input:radio:checked').parent().addClass("blue_text");
//   $('#tour_attend input:radio:checked').next().addClass("blue");
//
//
//   //text,span 클릭 시 설정
//   $('#tour_attend input:radio').click(function(){
//     $('#tour_attend input:radio:not(:checked)').parent().removeClass("blue_text");
//     $('#tour_attend input:radio:checked').parent().addClass("blue_text");
//
//     $('input:radio:not(:checked)').next().removeClass("blue");
//     $('input:radio:checked').next().addClass("blue");
//
//     });
//   });






//radio 체크 시 테투리도 파랑색으로
$(document).ready(function(){
  $('input:radio:checked').next().addClass("blue");

  $('input:radio').click(function(){
    $('input:radio:not(:checked)').next().removeClass("blue");
    $('input:radio:checked').next().addClass("blue");
  });
});








/**menu 토글 **/
$(".burger_container").click(function() {
  $('.side-nav').toggleClass('open');
  $(this).toggleClass('gone');
  $('#overlay').toggleClass('open');


if (!$('.burger_img').hasClass('menu')) {
        $('.burger_img').attr('src', 'img/ic-menu.svg');
        $('.burger_img').addClass('menu')

    } else  {
        $('.burger_img').attr('src', 'img/ic-close.svg');
        $('.burger_img').removeClass('menu')

    }
  });










// $("#show_title").click(function() {
//   $('#home_student_content_01').toggleClass('hidden');
//   $('#home_student_content_02').toggleClass('hidden');
// });


//created by Hassan Rana
//hassanrana300@gmal.com

/** 비용 설정 **/
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);



/**비용 설명 툴팁 **/
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});






  /**Radio 체크 파랑색 **/
$(document).ready(function(){
  $('input:radio:checked').next().addClass("blue");
  $('input:radio').click(function(){
    $('input:radio:not(:checked)').next().removeClass("blue");
    $('input:radio:checked').next().addClass("blue");
  });
});

/**on/off 로 overlay 조작 **/
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}




/** 비용 관련 JS **/


var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });
/**Step 1 - 비용 항목 input 변경 시 작동**/
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








$(document).on("change","#step1 #cost_member input",function(){
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  $('#step2 .bgn_n').text(cost_ins_n[1]);
  $('#step2 .ins_n').text(cost_ins_n[0]);
})


/**Step 2 - input 변경 시 cost_arr에 기입 **/

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
      curreny:cost_cur[i],
      unit:cost_unit[i],
      n_check:cost_n[i],
      ins_check:cost_ins[i],
      check:cost_foc[i]
    })
  }



var e="#ex_cost_";
var cur2=document.getElementsByClassName("currency2");

for(i=0;i<cost_arr.length;i++){
  var cost='';
  var ex_p1=$(e+(i+1)+' .p1');
  var ex_p2=$(e+(i+1)+' .p2');

  var ex_currency=$(e+(i+1)+' .cur');
  var ex_unit=$(e+(i+1)+' .unit');
  
  cur2[i].innerHTML=cost_arr[i].curreny;

  ex_p1.text(cost_arr[i].p1);
  ex_p2.text(cost_arr[i].p2);

  ex_currency.text(cost_arr[i].curreny);
  ex_unit.text(cost_arr[i].unit);

  cost=parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2);



 $('#step2 .cost').eq(i).text(cost);
 $('#step2 .cost2').eq(i).text(cost);
 
}





});


















/**Step 1 - 비용 추가/삭제 **/
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

function remove_div(obj){
  /**선택한 항목 삭제**/
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
/**처음 입력 시, 첫 비용 다이빙으로 고정**/
$(document).ready(function () {

    $('#room_type input.cost_name').val("다이빙");

  });  

/**Step 1의 배열 및 FOC 체크 상태 Update **/
var cost_arr=new Array();




var cost_

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

}



);






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
  }
}
}

}




/**Step 1 -> Step 2 배열 복사 **/
function s1_to_s2(){

  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });

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


  for(i=0;i<cost_arr_s1.length;i++){
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



  for(i=0;i<cost_arr.length;i++){

    $('.cost_p1 input').eq(i).val(cost_arr[i].p1);
    $('.cost_p1 select').eq(i).val(cost_arr[i].currency);
    $('.cost_p2 input').eq(i).val(cost_arr[i].p2);
    $('.cost_p2 select').eq(i).val(cost_arr[i].unit);
 
    if(cost_arr[i].n_check=="true"){
      $('.cost_n input[type="checkbox"]').eq(i).prop('checked',false);
    }
 
    if(cost_arr[i].ins_check=="true"){
      $('.cost_ins input[type="checkbox"]').eq(i).prop('checked',false);
    }
  }



}





/** Step 1 - 체크 시 div on/off **/

$(document).on("change","#step1 .cost_checkbox_container input",function(){
  var div= $(this).closest("label").next();
    if($(this).is(":checked")) {
        div.removeClass("hide");
    } else {
        div.addClass("hide");
    }
})


/** Step 2 - 비용 추가 **/
function add_div_s2(){
  if(s1_input!==s2_input){
  /**accordion 기능을 위해 c_array(배열 길이)로 넘버링**/
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


/** Step 2 - 비용 삭제 **/
/**복사 하는 부분에서 뭔가 꼬인 것 같다. 다시 다 통일 시키자 **/
function remove_div_s2(obj){
  document.getElementById('c_sibling').removeChild(obj.parentNode.parentNode.parentNode.parentNode);
}




/** Step 2 -> Step 3**/
function s2_to_s3(){
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });
  /**cost_ins : 강사 할인 비용 입력 **/
  /**cost_no_s : 교육생 미지원 강사 활동 비용 **/
  var cost_ins="";
  var cost_no_s="";

  /**강사 할인 비용**/
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

  /**교육생 미지원 강사 활동 비용**/
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






/** Step2 checbox 동적 변경**/

$(document).on("change","#step2 .cost_check_box_1 input",function(){
  var cost_n=$('.cost_n input').get().map(function(el) { return el.checked});
  var cost_ins=$('.cost_ins input').get().map(function(el) {return el.checked});
  var c_check_1=$('.ex_cost .collapse .check1');
  var c_check_2=$('.ex_cost .collapse .check2');
  var c_check_3=$('.ex_cost .collapse .check3');


var e="#ex_cost_"




var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});

  console.log(cost_arr);

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

    else if((!cost_n[i])&&(!cost_ins[i])){
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
          if(cost_arr[i].check==="true"){
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











