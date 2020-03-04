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


    // $('.more').each(function() {
    //     var content = $(this).html();
    //
    //     if(content.length > showChar) {
    //
    //         var c = content.substr(0, showChar);
    //         var h = content.substr(showChar, content.length - showChar);
    //
    //         var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
    //
    //         $(this).html(html);
    //     }
    //
    // });

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
