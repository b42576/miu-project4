var autofillData = function (){
	 
};

var getData = function () {
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        /*for (var n in obj) {
            var optSubText = obj[n][0] + " " + obj[n][1];
            $(".showData").append(optSubText);
            console.log(optSubText);
        }*/
        jQuery.each( obj, function( n, obj ) {
        $( ".showData" ).append( n + " " + obj.value + "<br />" );
        });
    }
};

var storeData = function (data) {
    var id = Math.floor(Math.random() * 100000001);
    var info = JSON.stringify(data);
    console.log(data);
    localStorage.setItem(id, info);
    console.log(id);
    console.log(info);
    //$( '.popupFormSaved' ).on();
    //$(".formbottons").
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

$('#display').on('pageinit', function(){
	//code needed for home page goes here
    getData();
    $('#display.clearPricebook').on('click', function(){clearLocal();});
    //clearLink.addEventListener("click", clearLocal);

});

$('#home').on('pageinit', function () {

    var myForm = $('#pricebookForm');
    myForm.validate({
        errorElement: "div",
        errorPlacement: function (error, element) {
            element.parent().parent().before(error);
        },
        rules: {
            location: { required: true },
            department: { required: true },
            productBrand: { required: true },
            productName: { required: true },
            productRating: { required: true },
            datePurchased: { required: true, dateISO: true },
            price: { required: true, number: true, minlength: 3 }
        },
        messages: {
            location: "You're going to want to remember what store you were in.",
            department: "This is for better clarification of what part of the store you were in.",
            productBrand: "Please enter the brand name of the product.",
            productName: "Take a look at some of the examples of the product names.",
            productRating: "How likely would you purchase this item again?",
            datePurchased: " Dates are required because dated prices may have gone up.",
            price: "Recording the prices will allow you to find the best price."
        },
        /*invalidHandler: function (form, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
        var message = errors == 1
        ? 'You missed 1 field. It has been highlighted'
        : 'You missed ' + errors + ' fields. They have been highlighted';
        $("#popupFormValuesMissing").appand(message);
        //$("div.error").show();
        //popupFormValuesMissing
        $( "#popupFormValuesMissing" ).popup();
        } else {
        $("div.error").hide();
        }
        },*/
        submitHandler: function (form) {
            //$( '.popupFormSaved' ).on();
            //$(".popupFormSaved").popup();
            alert("Pricebook entry added!");
            var data = myForm.serializeArray();

            storeData(data);
        }
    });


    //any other code needed for addItem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.



