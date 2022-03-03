import {parse_json} from './parse_json';
import $ from 'jquery';
import {Stars} from "./Stars";

export const MovieInfo = function(sel) {
    var that = this;
    var obj = $(sel);
    if(obj.length === 0) {
        return;
    }

    var element = obj.get(0);

    var title = element.dataset.movie;


    var year = element.dataset.year;

    var api_key = "c892182c734562398ba1f60a029b3702";

    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        data: {api_key: api_key, query: title, year: year},
        method: "GET",
        dataType: "text",
        success: function(data) {
            var json = parse_json(data);

            if(json.total_results > 0) {
                // Successfully updated


                that.info(json.results[0]);



            }else{
                that.message("<p>No information available</p>");
            }




        },
        error: function(xhr, status) {
            // Error
            that.message("<p>Unable to communicate<br>with themoviedb.org</p>");


        }
    });

}

MovieInfo.prototype.info = function(info) {
    var msg = $("#info");
    var message = "<ul>"
    message += '<li><a href=""><img src="dist/img/info.png"></a>';
    message += '<div class="show">' +
        '<p>Title: ' + info['title'] + '</p>' +
        '<p>Release Date: ' + info['release_date'] + '</p>' +
        '<p>Voting average: ' + info['vote_average'] + '</p>' +
        '<p>Vote count: ' + info['vote_count'] + '</p>' +
        '</div>' +
        '</li>';



    message += '<li><a href=""><img src="dist/img/plot.png"></a>' +
        '<div>' +
        '<p>' + info['overview'] + '</p></div>' +
        '</li>';

    if("poster_path" in info && info['poster_path'] != '') {
        var path = info['poster_path'];
        path = path.substr(1);
        path = "http://image.tmdb.org/t/p/w500/" + path;

        message += '<li><a href=""><img src="dist/img/poster.png"></a>' +
            '<div>' +
            '<p class="poster"><img src="'+ path +'">' +
            '</p></div>' +
            '</li>';

    }
    message += "</ul>"
    msg.html(message);

    $("ul > li > a").click(function(event){
        event.preventDefault();


        $(this).parent().parent().find("div").fadeOut(1000);
        $(this).parent().parent().find("img").css("opacity","0.3")

        $(this).parent().children("div").fadeIn(1000);
        console.log(1);
        $(this).children("img").css("opacity","1.0")
        $(this).parent().find("img").css("opacity","1.0")
    });

}



MovieInfo.prototype.message = function(message) {
    var msg = $("#info");
    msg.html(message);

}