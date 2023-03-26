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