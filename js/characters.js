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
    url: 'https://marvel-backend-nodejs.herokuapp.com/api/info',
    type: 'GET',
    success: function (result) {
        $.each(result, function (key, value) {
            console.log(value);
            $('#cards').append("<div class='card' style='width: 18rem;'> " +
                "<img src='" + value.image + "' class='card-img-top'>" +
                "<div class='card-body'>" +
                "<h5 class='card-title'> " + value.name + " </h5>" +
                "<a href='description.html?name="+ value.name +"' class='btn btn-primary'>Description</a>" +
                "</div>" +
                "</div>");
        });
    },
    error: function (result) {
        console.log(result);
        alert(result["statusText"]);
    }
});

$('#btnSearch').click(function(){
    var searchData = {
        "name": $('#BtnCharacters').val()
    };
    var JSON_searchData = JSON.stringify(searchData);
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/info/search',
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
                    "<img src='" + value.image + "' class='card-img-top'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'> " + value.name + " </h5>" +
                    "<a href='description.html?name="+ value.name +"' class='btn btn-primary'>Description</a>" +
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