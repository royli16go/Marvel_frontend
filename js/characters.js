$token = localStorage.getItem("token");
if($token){
    $('#Register').hide();
    $('#Login').hide();
    $('#Logout').show();
} else {
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
}

$.ajax({
    url: 'http://localhost:3000/api/info',
    type: 'GET',
    success: function (result) {
        $.each(result, function (key, value) {
            $('#cards').append("<div class='card' style='width: 18rem;'> " +
                "<img src='data:image/jpeg;base64," + value.image + "' class='card-img-top'>" +
                "<div class='card-body'>" +
                "<h5 class='card-title'> " + value.name + " </h5>" +
                "<p class='card-text'>" + value.description + "</p>" +
                "<a href='#' class='btn btn-primary'>Go somewhere</a>" +
                "</div>" +
                "</div>");
        });
    },
    error: function (result) {
        console.log(result);
        alert(result);
    }
});

$('#btnSearch').click(function(){
    var searchData = {
        "name": $('#BtnCharacters').val()
    };
    var JSON_searchData = JSON.stringify(searchData);
    $.ajax({
        url: 'http://localhost:3000/api/info/search',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON_searchData,
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            if(result.length < 1){
                $('#cards').empty();
                $('#cards').append("<div class='NotFind'>Sorry, The Marvel Characters is not find.</div>")
            }
            $.each(result, function (key, value) {
                $('#cards').empty();
                $.each(result, function (key, value) {
                    $('#cards').append("<div class='card' style='width: 18rem;'> " +
                        "<img src='data:image/jpeg;base64," + value.image + "' class='card-img-top'>" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title'> " + value.name + " </h5>" +
                        "<p class='card-text'>" + value.description + "</p>" +
                        "<a href='#' class='btn btn-primary'>Go somewhere</a>" +
                        "</div>" +
                        "</div>");
                });
            });
        },
        error: function (result) {
            console.log(result);
            alert(result);
        }
    });
});

$('#Logout').click(function() {
    localStorage.removeItem('token');
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
    location.href='index.html';
});