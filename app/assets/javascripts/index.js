$(document).on('turbolinks:load', function(){
  $(function() {

    function appendUser(user) {
      var html =` <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
      ${user.name}
      </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
      追加
      </a>
      </div>`
      $("#user-search-result").append(html)
     }

    function appendAddUser(userid, name){
      var html = `<div class='chat-group-user clearfix js-chat-member' id='${userid}'>
      <input name='group[user_ids][]' type='hidden' value='${userid}'>
      <p class='chat-group-user__name'>
      ${name}
      </p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
        削除
      </a>
      </div>`
      $("#chat-group-users").append(html);
     }


  $(".chat-group-form-search").on("keyup", function(e) {
    e.preventDefault();
    var input = $(".chat-group-form-search").val();
    if (input.length != ""){
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
          appendNoUser("一致するユーザーがいません。");
        }
      })
      .fail(function(user){
        alert('error');
      })
    }
  });

  $('.chat-group-form__field--right').on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove()
      var userid = $(this).data('user-id')
      var name = $(this).data('user-name')
        appendAddUser(userid, name);
    });
    $('#chat-group-users').on('click', '.user-search-remove', function(){
      $(this).parent().remove()
    })
  });
});