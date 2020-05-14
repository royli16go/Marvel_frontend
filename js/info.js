$("#BtnSignUp").click(function() {

    var HeroData = {
        "name":$("#HeroName").val(),
        "description":$('#description').val()
    };

    var JSON_HeroData = JSON.stringify(HeroData);
    console.log(JSON_HeroData);

    $.ajax({
        url: 'http://localhost:3000/info/',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON_HeroData,
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            alert(result['success']);
        },
        error: function(result){
            console.log(result);
            alert(result['error']);
        }
      });
    
});