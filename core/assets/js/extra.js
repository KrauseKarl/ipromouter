 $(document).ready(function ()  {
        var $region = $('#region_id')
        var $city = $('#city_id')
        var $options = $city.find('option');
        $region.on('change', function() {
           $city.html($options.filter(`[value="${this.value}"]`));
        }).trigger('change');
        $city.on('change', function() {
        $('#container').html(`
                                <h4>регион ${$region.find(":selected").text()}</h4>
                                <h3>город: ${$city.find(":selected").text()}</h3>
                                <div>оказываем услуги:</div>
                                <ul>
                                <li>раздача листовок</li>
                                <li>дегустация</li>
                                <li>сэмплинг</li>
                                </ul>
         `)
        });

    });
$(document).ready(function ()  {

});
var options = {
  valueNames: [ 'region', 'capital', 'big_city', 'small_city' ]
};

var $userList = new List('ru_all_cities', options)



//$(document).on('change', '#search_query',function() {
//        if($('#search_query').val() == ''){
//        $('#result').val() = ' '
//        }
//       $('ul.list-group.list-group-flush.cities').find( "li" ).each(function(i, el){
//            $(this).parents('ul').addClass('invisible')
//           if($('#search_query').val() == $(this).attr('value')){
//                console.log( $(this).parents('ul').first().removeClass('invisible'))
//                $('#result').css("display", "block");
//                $('#result').append( `${$(this).attr('value')}` );
//                var $parent = $(this).parents('ul').first()
//                $('#result').append($(this).wrapAll($parent))
//                $('#result').append( $(this).parents('ul').first().removeClass('invisible'));
//                $('#result').addClass("text-success");
//
//           } else {
//
//
//           }
//        });
//    });
//$('#clean_search').on('click', function(){
// $(':input','#search_query')
//          .not(':button, :submit, :reset, :hidden')
//          .val('')
//          .prop('checked', false)
//          .prop('selected', false);
//})
$(document).ready(function ()  {
    var $kz_cities = $('#kz_cities').hide()
    var $ru_big = $('#ru_big_cities').show()
    var $ru_all = $('#ru_all_cities').hide()

    $('#ru_big_cities_btn').addClass('btn-success')
    $('#ru_all_cities_btn').removeClass('btn-success')
    $('#kz_cities_btn').removeClass('btn-success')

    var btn_kz_cities = $('#kz_cities_btn')
    var btn_ru_big = $('#ru_all_cities_btn')
    var btn_ru_all = $('#ru_big_cities_btn')

    $('#kz_cities_btn').on('click', function () {
        $kz_cities.show('slow')
        $('#kz_cities_btn').addClass('fs-3')
        $('#ru_all_cities_btn').removeClass('btn-success')
        $('#ru_big_cities_btn').removeClass('btn-success')
        $ru_big.hide('slow')
        $ru_all.hide('slow')
    });
     $('#ru_all_cities_btn').on('click', function () {
        $(':input','#search_query')
          .not(':button, :submit, :reset, :hidden')
          .val('')
          .prop('checked', false)
          .prop('selected', false);
        $kz_cities.hide('slow')
        $ru_big.hide('slow')
        $ru_all.show('slow')
        $('#ru_all_cities_btn').addClass('btn-success')
        $('#kz_cities_btn').removeClass('btn-success')
        $('#ru_big_cities_btn').removeClass('btn-success')
    });
     $('#ru_big_cities_btn').on('click', function () {
        $kz_cities.hide('slow')
        $ru_big.show('slow')
        $ru_all.hide('slow')
        $('#ru_big_cities_btn').addClass('btn-success')
        $('#ru_all_cities_btn').removeClass('btn-success')
        $('#kz_cities_btn').removeClass('btn-success')

    });
});



$('#message_form').on('submit', function (event) {
    $("#error-msg").css('opacity', '0');
     validateForm()
     event.preventDefault();
});
function validateForm() {
    $('#success_send').addClass('invisible');
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var comments = $("#comments").val();
    $("#error-msg").css('opacity', '0');
    $('#error-msg').html("");
    if (name == "" || name == null) {
        $('#error-msg').html("<div class='text-danger alert alert-warning error_message'>*Please enter a Name*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (email == "" || email == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>*Please enter a Email*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (subject == "" || subject == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>*Please enter a Subject*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (comments == "" || comments == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>*Please enter a Comments*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    $.ajax({
        url: "/contact",
        type: 'post',
        dataType: 'json',
        data: $('form#message_form').serialize(),
        success: function (response) {
            console.log('you did it!')
            if (response.message == true) {
                $('#message_form').css('display', 'none ')
                $('#success_send').removeClass('invisible')
                setTimeout(function () {
                    $('#success_send').addClass('invisible');
                    $('#message_form').css('display', 'block ');
                        $("#name").val("");
                    $("#email").val("");
                    $("#subject").val("");
                    $("#comments").val("");
                    $('#contactform').modal('hide');
    }, 3000);
            } else {
                alert('error')
            };
            },
    });

//    return false;
  }

