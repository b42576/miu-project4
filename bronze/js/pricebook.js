var autofillData = function (){
	 
};

var getData = function () {
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        jQuery.each( obj, function( n, obj ) {
        $( ".showData" ).append( n + " " + obj.value + "<br />" );
        });
    }
};

var storeData = function (data) {
    var id = Math.floor(Math.random() * 100000001);
    var info = JSON.stringify(data);
    //console.log(data);
    localStorage.setItem(id, info);
    //console.log(id);
    //console.log(info);
    getData();
    window.location.reload();
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){
    if(localStorage.length === 0) {
        alert("There is nothing to clear.");
    }else{
        localStorage.clear();
        window.location.reload();
        return false;
    }
};

$(window).load(function () { $("input,select,date").not("[type=submit]").jqBootstrapValidation({
                        preventSubmit: true,
                        submitError: function($form, event, errors) {
                            // Here I do nothing, but you could do something like display 
                            // the error messages to the user, log, etc.
                        },
                        submitSuccess: function($form, event) {
                            alert("OK");
                            var data = myForm.serializeArray();
                            storeData(data);
                            event.preventDefault();
                        },
                        filter: function() {
                            return $(this).is(":visible");
                        }
}); } );

