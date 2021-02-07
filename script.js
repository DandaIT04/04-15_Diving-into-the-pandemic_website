$(document).ready(function(){
    var url = "https://disease.sh/v3/covid-19/countries/Singapore" //api and search function

    $.ajax({
        method:'GET',
        url:url,
        dataType:"JSON",
    
        statusCode: {
            404: function () {
      
                alert("Check Spelling!");
            }
        },
        
    
        success:function(data){
            console.log(data)
            $('#fact_id').html('');
    
            $('#fact_id_cases').append('<li>Total Cases: '+data.cases+'</li>');

            $('#fact_id_current').append('<li>Current Infected: '+data.active+'</li>');

            $('#fact_id_deaths').append('<li>Total Deaths: '+data.deaths+'</li>');

            $('#fact_id_recovered').append('<li>Total Recovered: '+data.recovered+'</li>');

            $('#fact_id_today').append('<li>Total infected today: '+data.cases+'</li>');
        }
    })

    $("#submit_button").on("click", function(e)
    {
        e.preventDefault();

        window.location.href = "thirdpage.html";
    })


})


