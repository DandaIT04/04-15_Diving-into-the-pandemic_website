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
    
            //There are total cases in singapore and x infected right now
            $('#fact_id_cases').append('<h2>There are a total of <h2><li>'+data.cases+'</li><h2> Cases in Singapore<h2>');
            $('#fact_id_current').append('<h2>Currently <h2><li>'+data.active+'</li><h2> are infected in Singapore<h2>');


            //There are x deaths and y recovery
            $('#fact_id_recovered').append('<h2>So far <h2><li>'+data.recovered+'</li><h2> people reported <br>having recovered<h2>');
            $('#fact_id_deaths').append('<h2>While <h2><li>'+data.deaths+'</li><h2>perished due to the virus<h2>');
            


            //x out of y people can be infected and today there are z infected cases
            $('#fact_id_chance').append('<h2>Probability of<br> one case per <h2><li>' + data.oneCasePerPeople+'</li><h2> people<h2>');
            $('#fact_id_today').append('<li>Infected Today: '+data.todayCases+'</li>');
        }
    })

    $("#submit_button").on("click", function(e)
    {
        e.preventDefault();

        window.location.href = "thirdpage.html";
    })


})


