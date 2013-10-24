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
        jQuery.each(obj, function (n, obj) {
            console.log(obj);
            $(".showData").append(obj.name + " " + obj.value + "<br />");
        });
    }
};

var getAdData = function () {
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        /*for (var n in obj) {
        var optSubText = obj[n][0] + " " + obj[n][1];
        $(".showData").append(optSubText);
        console.log(optSubText);
        }*/
        jQuery.each(obj, function (n, obj) {
            console.log(obj);
            $(".showAdData").append(obj.name + " " + obj.value + "<br />");
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
var storeAdData = function (data) {
    var id = Math.floor(Math.random() * 100000001);
    var info = JSON.stringify(data);
    console.log(data);
    localStorage.setItem("ad"+id, info);
    console.log(id);
    console.log(info);
    //$( '.popupFormSaved' ).on();
    //$(".formbottons").
    getAdData();
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
$('#displayAdData').on('pageinit', function(){
	//code needed for home page goes here
    getAdData();
    $('#displayAdData.clearAdData').on('click', function(){clearLocal();});
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

    var adForm = $('#adForm');
    adForm.validate({
        errorElement: "div",
        errorPlacement: function (error, element) {
            element.parent().parent().before(error);
        },
        rules: {
            adlocation: { required: true },
            dateAdFrom: { required: true, dateISO: true },
            dateAdTo: { required: true, dateISO: true },
            adItem: { required: true },
            adprice: { required: true }
        },
        messages: {
            adlocation: "What store is this ad for?",
            dateAdFrom: "When does this sale start?",
            dateAdTo: "When does this sale end?",
            adItem: "What is the product on sale?",
            adprice: "How much does it cost on sale?"
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
            alert("Ad item added!");
            var adData = adForm.serializeArray();

            storeAdData(adData);
        }
    });
    //any other code needed for addItem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.


//tabs
 (function(a,b){a.widget("mobile.inlinetabs",a.mobile.widget,{options:{iconpos:"left",scroll:null,theme:null,tabTheme:null,contentTheme:null,activeClass:a.mobile.activeBtnClass,mini:null,initSelector:":jqmData(role='inlinetabs')"},_create:function(){this.refresh(true)},refresh:function(f){if(!f){this.element.find(".ui-inlinetabs-content").unwrap()}var j=this.element,i=j.children(":not(:jqmData(tab-ignore))").first(),g=i.children(":not(:jqmData(tab-ignore))"),c=j.children(":gt(0):not(:jqmData(tab-ignore))"),k=c.wrapAll('<div class="ui-inlinetabs-container" />').parent(),d=this.options,h=g.filter(f?":jqmData(active)":"."+d.activeClass).first();i.addClass("ui-inlinetabs-bar ui-corner-all");if(d.theme){i.addClass("ui-bar-"+d.theme)}if(d.mini){i.addClass("ui-mini")}if(d.scroll){i.addClass("ui-inlinetabs-scroll")}if(d.contentTheme){i.addClass("ui-inlinetabs-corner-top")}if(!h.length){h=g.first()}g.each(function(){$this=a(this);if(f||!$this.hasClass("ui-inlinetabs-tab")){$this.buttonMarkup({corners:false,shadow:false,inline:true,theme:$this.jqmData("theme")||d.tabTheme,iconpos:$this.jqmData("icon")?($this.jqmData("iconpos")||d.iconpos):b,mini:d.mini}).addClass("ui-corner-all ui-inlinetabs-tab")}});if(!f){g.removeClass(d.activeClass)}h.addClass(d.activeClass);var e=h.jqmData("tab")?c.filter(":jqmData(tab='"+h.jqmData("tab")+"')"):null;if(d.contentTheme){k.addClass("ui-corner-all ui-body-"+d.contentTheme);if(d.theme){k.addClass("ui-inlinetabs-container-top")}}c.addClass("ui-inlinetabs-content").hide();if(e){e.show()}if(!f){i.off("vclick.inlinetabs",".ui-inlinetabs-tab")}i.on("vclick.inlinetabs",".ui-inlinetabs-tab",function(l){if(!a(l.target).hasClass("ui-disabled")){$this=a(this);g.removeClass(d.activeClass);$this.addClass(d.activeClass).trigger("tab-show");c.hide();var m=$this.jqmData("tab");if(m){c.filter(":jqmData(tab='"+m+"')").show().trigger("tab-show")}}});if(f&&d.scroll){i.on("vmousedown",function(l){a(this).jqmData("scrollpos",l.pageX)}).on("vmousemove",function(q){var p=a(this),l=q.pageX,n=p.jqmData("scrollpos");if(!n){return}var m=p.scrollLeft()-l+n,o=p[0].scrollWidth-j.width();if(o<0){o=0}if(m<0){m=0}else{if(m>=o){m=o-1}}p.scrollLeft(m);p.jqmData("scrollpos",l);q.preventDefault()}).on("mousewheel",function(n,p,m,l){if(typeof(p)=="undefined"||p==0){return}var o=a(this);o.scrollLeft(o.scrollLeft()-p*50);n.preventDefault()});a.mobile.document.on("vmouseup",function(){i.jqmRemoveData("scrollpos")})}},show:function(c){this.element.find(".ui-inlinetabs-tab:jqmData(tab='"+c+"')").trigger("vclick")}});a.mobile.document.bind("pagecreate create",function(c){a.mobile.inlinetabs.prototype.enhanceWithin(c.target)})})(jQuery);

 	$(document).on('vclick', '#addtab', function() {
		$('#tabbar').append('<li data-tab="1">links to content 1</li> ');
		$('#tabcontainer').inlinetabs('refresh');
	});

	$(document).on('vclick', '#acttab2', function() {
		$('#tabcontainer').inlinetabs('show', '2');
	});

	$(document).on('vclick', '#removetab', function() {
		$('#tabbar').children().last().remove();
		$('#tabcontainer').inlinetabs('refresh');
	});

	$(document).on('tab-show', '#dynamictab', function() {
		$(this).html('This content was dynamically injected.');
	});