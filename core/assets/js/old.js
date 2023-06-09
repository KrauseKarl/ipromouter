/*************************************************/
/*                 INDEX                         */
/*=================================================
 *     01.  SEARCH CITIES LIST                    *
 *     02.  CHOSEN CITIES BUTTONS                 *
 *     03.  CONTACT MESSAGE  FORM                 *
 *     04.  CONTACT MESSAGE VALIDATOR             *
 *     05.  PHONE NUMBER  VALIDATOR               *
 *     06.  COPY PHONE NUMBER + TOASTER           *
 *     07.  COPY E-MAIL   + TOASTER               *
 =================================================*/




// $(document).ready(function ()  {
//     var $region = $('#region_id')
//     var $city = $('#city_id')
//     var $options = $city.find('option');
//     $region.on('change', function() {
//       $city.html($options.filter(`[value="${this.value}"]`));
//     }).trigger('change');
//     $city.on('change', function() {
//     $('#container').html(`
//                             <h4>регион ${$region.find(":selected").text()}</h4>
//                             <h3>город: ${$city.find(":selected").text()}</h3>
//                             <div>оказываем услуги:</div>
//                             <ul>
//                             <li>раздача листовок</li>
//                             <li>дегустация</li>
//                             <li>сэмплинг</li>
//                             </ul>
//      `)
//     });
// });

// 01. SEARCH CITIES LIST
// $(document).ready(function ()  {
//     var options = {
//             valueNames: ['name']
//         };
//     var userList = new List('ru_all_cities', options)
// });

// 02. CHOSEN CITIES BUTTONS
$(document).ready(function () {
    var $kz_cities = $('#kz_cities').hide()
    var $ru_big = $('#ru_big_cities').show()
    var $ru_all = $('#ru_all_cities').hide()

    $('#ru_big_cities_btn').addClass('btn-success  p-1 rounded')
    $('#ru_all_cities_btn').removeClass('btn-success  p-1 rounded')
    $('#kz_cities_btn').removeClass('btn-success  p-1 rounded' )

    $('#kz_cities_btn').on('click', function () {
        $kz_cities.show('slow')
        $('#kz_cities_btn').addClass('btn-success  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-success  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-success  p-1 rounded');
        $ru_big.hide('slow')
        $ru_all.hide('slow')
    });
    $('#ru_all_cities_btn').on('click', function () {
        $('#search').val('');
        $kz_cities.hide('slow');
        $ru_big.hide('slow');
        $ru_all.show('slow');
        $('#ru_all_cities_btn').addClass('btn-success  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-success  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-success  p-1 rounded');
    });
    $('#ru_big_cities_btn').on('click', function () {
        $kz_cities.hide('slow')
        $ru_big.show('slow')
        $ru_all.hide('slow')
        $('#ru_big_cities_btn').addClass('btn-success  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-success  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-success  p-1 rounded');
    });
});

// 03. CONTACT MESSAGE  FORM
$('#message_form').on('submit', function (event) {
    $("#error-msg").css('opacity', '0');
     validateForm()
     event.preventDefault();
});

// 04. MESSAGE VALIDATOR
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
  }

// 05. PHONE NUMBER VALIDATOR
$(document).ready(function() {
$("#telephone").mask("+7 (999) 999-99-99");
});

// 06. COPY PHONE NUMBER + TOASTER
$('#copyPhoneBtn').on('click', function () {
    var info = $(this).val()
    navigator.clipboard.writeText(info)
    .then(() => {
    })
    .catch(err => {
    });
    $('#copyPhoneToast').show('slow');
    setTimeout(() => {
    $('#copyPhoneToast').hide('slow');
    }, 2000);
})

// 07. COPY E-MAIL + TOASTER
$('#copyMailBtn').on('click', function () {
     var info = $(this).val()
    navigator.clipboard.writeText(info)
    .then(() => {
    })
    .catch(err => {
    });
    $('#copyMailToast').show('slow');
    setTimeout(() => {
    $('#copyMailToast').hide('slow');
    }, 2000);
})
// 08.
$(document).ready(function() {
    $('#search').keyup(function(){
        console.log($(this).val() !== '')
        if($(this).val() !== '' ){
            var query = $(this).val();
            queryString(query);
        } else {
            backCities();
        };
    }).trigger('change');
});

function queryString(query) {
    $('button.accordion-button').each(function() {
        var city = $(this).data('value')
        if(city) {
            if(city.indexOf(query) != -1 ){
                $(this).parents('.col-lg-4.col-md-12.mb-2').css('display', 'block');
            } else {
                $(this).parents('.col-lg-4.col-md-12.mb-2').css('display', 'none');
            };
        };
    });
};
function backCities() {
    $('button.accordion-button').each(function() {
      $(this).parents('.col-lg-4.col-md-12.mb-2').css('display', 'block');
    });
};



