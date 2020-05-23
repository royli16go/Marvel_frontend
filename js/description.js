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
$('#Logout').click(function() {
    localStorage.removeItem('token');
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
    location.href='index.html';
});

let params = new URLSearchParams(location.search);
$.ajax({
    url: 'http://localhost:3000/api/info/'+params.get('name'),
    type: 'POST',
    success: function (result) {
        console.log(result);
    },
    error: function (result) {
        console.log(result);
        alert(result["statusText"]);
    }
});