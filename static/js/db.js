/*var menu_data = getData('/menu_json')
var mkb_data = getData('/mkb');*/
const dbVersion = 5;

if(!window.indexedDB){
  console.log("not support");
}else{

   var db;
   var request;

   request = window.indexedDB.open("locahost_db", dbVersion);


   request.onsuccess = function(e) {
        console.log("running onsuccess");
        db = e.target.result;
    }

   request.onupgradeneeded = function(e){
       console.log("check DB");
       var _db = e.target.result;
       var txn = e.target.transaction;

        var menu_data = getData('/check_list.github.io/static/json_base/menu.json')
        var mkb_data = getData('/check_list.github.io/static/json_base/mkb.json');
        var check_lists_data = getData('/check_list.github.io/static/json_base/check_list_menu.json');
        var check_lists_items_data = getData('/check_list.github.io/static/json_base/check_list_items.json');

       if (e.oldVersion == 0){
            createTable(_db, "menuT", menu_data, "id", false, false);
            createTable(_db, "mkbT", mkb_data, null, true, {'name':'kod, title', 'path':['kod', 'title']});
            createTable(_db, "check_lists", check_lists_data, "id", false, false);
            createTable(_db, "check_list_items", check_lists_items_data, "id", false, false);

       }else{

           if (isTableExist(_db,"menuT"))
               _db.deleteObjectStore("menuT");
           if (isTableExist(_db,"mkbT"))
               _db.deleteObjectStore("mkbT");
            if (isTableExist(_db,"check_lists"))
               _db.deleteObjectStore("check_lists");
             if (isTableExist(_db,"check_list_items"))
               _db.deleteObjectStore("check_list_items");

           createTable(_db, "menuT", menu_data, "id", false);
           createTable(_db, "mkbT", mkb_data, null, true);
           createTable(_db, "check_lists", check_lists_data, "id", false, false);
           createTable(_db, "check_list_items", check_lists_items_data, "id", false, false);

       }
       console.log(e);
   };

   request.onerror = function(e) {
      console.log(request.error.name, request.error.message, request.error.errorCode);
   };

}

function isTableExist(dataBase, table_name){
    let isExist = false;
    if(dataBase.objectStoreNames.contains(table_name)){
        isExist = true;
    }
    return isExist;
}

function createTable(dataBase,table_name, dtSource, keyPathTitle, autoInc, indexData){
    var table = dataBase.createObjectStore(table_name, autoInc ? {autoIncrement: true} : {keyPath: keyPathTitle})
    if(indexData){
        table.createIndex(indexData.name, indexData.path);
    }

    for (var i in dtSource){
        table.add(dtSource[i])
    }
}


//function createIndex(dataB, tableName, indexName, indexFields){
//    var table = dataB.transaction([tableName],"readwrite");
//    table.createIndex(indexName,indexFields);
//}

function getData(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText)
}

/*function getData(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText)
}*/
