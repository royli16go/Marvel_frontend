$("#BtnDeleteHero").click(function() {
    $.ajax({
        url: 'http://localhost:3000/api/info/' + $("#HeroName").val(),
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (result) {
            if(result['deletedCount']==1){
                alert('Delete Success');
            }
            
        },
        error: function(result){
            console.log(result);
            alert(result['error']);
        }
      });
    
});