// Kevin Fry - MIU 1310 - Project 3
// must fix editing an item, currently duplicates them

window.addEventListener("DOMContentLoaded", function () {
    function getEId(x) {
        var theElement = document.getElementById(x);
        return theElement;
    } ;
    
    function makeStores() {
        var formTag = document.getElementsByTagName("form"),
                selectLi = getEId('locations'),
                makeSelect = document.createElement('select');
                makeSelect.setAttribute("id", "location");
        for(var i=0, j=stores.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = stores[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    };
/*
    function makeTypes(){
        var formTag = document.getElementsByTagName("form"),
                selectLi = getEId('sizeTypes'),
                makeSelect = document.createElement('select');
                makeSelect.setAttribute("id", "sizeType");
        for(var i=0, j=sizeTypes.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = sizeTypes[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    };
    */
    // find value of selected radio buttin
    function getSelectedRadio(){
        var radios = document.forms[0].tax;
        for(var i=0; i<radios.length; i++){
            if (radios[i].checked){
                taxValue = radios[i].value;
            }
        }
    };
    /*
    function getData(){
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        for(var i = 0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
        }
    }
    */
    function toggleControls(n){
        switch(n){
            case "on":
                getEId('pricebookForm').style.display = "none";
                getEId('clearPricebook').style.display = "inline";
                getEId('displayPricebook').style.display = "none";
                getEId('addNew').style.display = "inline";
            break;
            case "off":
                getEId('pricebookForm').style.display = "block";
                getEId('clearPricebook').style.display = "inline";
                getEId('displayPricebook').style.display = "inline";
                getEId('addNew').style.display = "inline";
                getEId('items').style.display = "none";
            break;
            default: return false;
                
        }
    };
    // not saving to localstorage.
    // submitting my work to find out why later on the next project
    function storeData(key){
        var alertMessage;
        if(!key){
            var id = Math.floor(Math.random()*100000001);
            alertMessage = "Item Added";
        }else{
            id=key;
            alertMessage = "Item Edited";
        }
        
        // get form values // store in objet
        getSelectedRadio();
        // object properties contain array with the form label and input values
        console.log (getEId('location').value);
        var item = {
            "location"           : ["Location:", getEId('location').value],
            "productBrand"       : ["Brand:", getEId('productBrand').value],
            "productName"        : ["Name:", getEId('productName').value],
            "description"        : ["Description:", getEId('productDescription').value],
            "productRating"      : ["Rating:", getEId('productRating').value],
            "price"              : ["Price:", getEId('price').value],
            "tax"                : ["Taxable:", taxValue],
            "datePurchased"      : ["Date:", getEId('datePurchased').value],
            "size"               : ["Size:", getEId('size').value]
        };
            //item.store              = ["Store:", getEId('productBrand').value];
            //item.sizeType           = ["Size Type:", getEId('sizeType').value];
            var info=JSON.stringify(item);
            localStorage.setItem(id, info);
            alert(alertMessage);
            //window.location.reload();
            getData();
    };
    
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            autoFillData();
            alert("There are no items in your pricebook, so we're adding some for you.");
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        getEId('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeLi = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);
            getImage(obj.location[1], makeSubList);
            for(var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
        //makeItemLinks(localStorage.key(i), linksLi);

    };
    
    function getImage(storeName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src", "img/"+storeName+".png");
        imageLi.appendChild(newImg);
    };
    
    function autoFillData(){
        for(var n in json){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    };
    
    function makeItemLinks(key, linksLi){
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        editLink.addEventListener("click",editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.addEventListener("click",deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    };
    function editItem(){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        toggleControls("off");
        getEId('location').value = item.location[1];
        getEId('productBrand').value = item.productBrand[1];
        getEId('productName').value = item.productName[1];
        getEId('productDescription').value = item.description[1];
        getEId('productRating').value = item.productRating[1];
        getEId('price').value = item.price[1];
        //item.tax                = ["Taxable?", taxValue];
        var radios = document.forms[0].tax;
        for(var i=0; i<radios.length;i++){
            if(radios[i].value === "Yes" && item.tax[1] === "Yes"){
                radios[i].setAttribute("checked","checked");
            }else if(radios[i].value === "No" && item.tax[1] === "No"){
                radios[i].setAttribute("checked","checked");
            }
        }
        getEId('datePurchased').value = item.datePurchased[1];
        getEId('size').value = item.size[1];
        //getEId('sizeType').value = item.sizeType[1];
        
        save.removeEventListener("click", storeData);
        getEId('submit').value = "Edit Item";
        var editSubmit = getEId('submit');
        editSubmit.key = this.key;
        editSubmit.addEventListener("click", validate);

    };
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this item?");
        if (ask){
            localStorage.removeItem(this.key);
            alert("Item was deleted!");
            window.location.reload();
        }else{
            alert("Item was NOT deleted.");
        }
    };
    function clearLocal(){
        if(localStorage.length === 0) {
            alert("There is nothing to clear.");
        }else{
            localStorage.clear();
            window.location.reload();
            return false;
        }
    };
    function validate(e){
        var getProductBrand = getEId('productBrand');
        var getProductName = getEId('productName');
        var getLocation = getEId('location');
        //var getPrice = getEId('price');
        //var getSizeTypes = getEId('sizeType');
        
        errMsg.innerHTML = "";
            getProductBrand.style.border = "1px dashed black";
            getProductName.style.border = "1px dashed black";
            getLocation.style.border = "1px dashed black";
            //getPrice.style.border = "1px dashed black";
            //getSizeTypes.style.border = "1px dashed black";
         
        
        var errorMessages = [];
        
        if(getProductBrand.value === ""){
            var brandError = "Please enter a product brand.";
            getProductBrand.style.border = "1px dashed red";
            errorMessages.push(brandError);
        }

        if(getProductName.value === ""){
            var nameError = "Please enter a product name.";
            getProductName.style.border = "1px dashed red";
            errorMessages.push(nameError);
        }
        
        if(getLocation.value === "--Select A Store--"){
            var locationError = "Please select a store";
            getLocation.style.border = "1px dashed red";
            errorMessages.push(locationError);
        }/*
        if (! (/^\d*(?:\.\d{0,2})?$/.test(getPrice))) {
            var getPriceError = "Please enter a valid price";
            getPrice.style.border = "1px dashed red";
            errorMessages.push(getPriceError);
        }
        if(getSizeTypes.value === "--Select A Size Type--"){
            var sizeTypeError = "Please select a size";
            getSizeTypes.style.border = "1px dashed red";
            errorMessages.push(sizeTypeError);
        }
        */
        
        if(errorMessages.length > 0){
            for(var i=0,j=errorMessages.length; i<j;i++){
                var txt = document.createElement('li');
                txt.innerHTML = errorMessages[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
            storeData(this.key);
        }

    };
    //var sizeTypes = ["--Select A Size Type--","Count","Each","Pack","Fluid Ounce","Fluid Ounces","Ounce","Ounces","Pound","Pounds"],
            var stores = ["--Select A Store--","ShopRite","Acme","SuperFresh","Giant","Target","WalMart"],
            //sizeValue,
            taxValue,
            errMsg = getEId('errors');
    makeStores();
    //makeTypes();
    
    var displayLink = getEId('displayPricebook');
    displayLink.addEventListener("click", getData);
    var clearLink = getEId('clearPricebook');
    clearLink.addEventListener("click", clearLocal);
    var save = getEId('submit');
    save.addEventListener("click", validate);
});