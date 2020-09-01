     function openMenu(x){
        pop_menu = {
             open : function (items) {
               document.getElementById("pop-up-menu").classList.add("open");
              },
             close : function () {
               document.getElementById("pop-up-menu").classList.remove("open");
             }
         };
         if(!x.classList.toggle("open")/*x.classList.contains('open')*/){
            $('#pop-up-menu-items').empty();
            pop_menu.close();
            return;
         }else{
              var tx = db.transaction(['menuT'],"readwrite");
              var store = tx.objectStore('menuT');
              var cursor = store.openCursor();
              cursor.onsuccess = function(e) {
                    var res = e.target.result;
                    if(res) {
                        $('#pop-up-menu-items').append(
                            '<div id="container_content_image" class="container_child_item" onclick="window.location.href =\''+res.value.file_name+'\';">'+
                            '<img src="'+res.value.icon_path+'"><span>'+res.value.title+'</span>'+
                            '</div>'
                        );
                     res.continue();
                    }else{
                      pop_menu.open(null);
                    }
                }
         }
      };