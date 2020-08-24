/*var menu_data = getData('/menu_json')
var mkb_data = getData('/mkb');*/

if(!window.indexedDB){
  console.log("not support");
}else{
   var request = window.indexedDB.open("locahost_db", 4);
   var db

   request.onsuccess = function(e) {
        console.log("running onsuccess");
        db = e.target.result;
    }

   request.onupgradeneeded = function(e){
       var _db = e.target.result;
       var txn = e.target.transaction;

        var menu_data = getData('/check_list.github.io/static/json_base/menu.json')
        var mkb_data = getData('/check_list.github.io/static/json_base/mkb.json');
       if (e.oldVersion == 0){
            createTable(_db, "menuT", menu_data, "id", false, false);
            createTable(_db, "mkbT", mkb_data, null, true, {'name':'kod, title', 'path':['kod', 'title']});

       }else{
           _db.deleteObjectStore("menuT");
           _db.deleteObjectStore("mkbT");

           createTable(_db, "menuT", menu_data, "id", false);
           createTable(_db, "mkbT", mkb_data, null, true);


       }
       console.log(e);
   };

   request.onerror = function(e) {
      console.log(request.error.name, request.error.message);
   };

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
