$(function() {
  var search_list = $("#user-search-result");
  var chat_mem = $(".chat-group-users");

  function appendUser(user) {
    var html = `<div class = "chat-group-user clearfix">
                  <p class = "chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加 </a>
                </div>`

    search_list.append(html);
  }

  function changeUser(userName,userId){          
    var html =`
          <div class='chat-group-user clearfix js-chat-member' id='${ userId }'>
          <input name='group[user_ids][]' type='hidden' value='${ userId }'>
          <p class='chat-group-user__name'>${ userName }</p>
          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
          </div>`
    chat_mem.append(html);
  }  

  function appendErrMsgToHTML(msg) {
    var html = `<div class = "chat-group-user clearfix">
                  <p class = "chat-group-user__name">${msg} </p>               
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

      if (input.length) {
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })

        .done(function(users) {
          $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);

            });
          }
          else {
            appendErrMsgToHTML("一致するユーザはいません");
          }
        })
        .fail(function() {
          alert('ユーザ検索に失敗しました');
        })
      } else {
        $("#user-search-result").empty();
      }
    });

  $("body").on('click', '.chat-group-user__btn--add', function(){          
    $(this).parent().remove();
    var userName = $(this).data('userName');
    var userId = $(this).data('userId');
    changeUser(userName,userId);
  })

  $("body").on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  })
});