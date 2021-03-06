$(document).on('turbolinks:load', function(){  
  function buildHTML(message){

    var image = message.image.url ? `<img class="message__image" src="${message.image.url}">`: "";

    var html = `<div class="message" data-message-id= "${message.id}">
                  <div class="message__user">
                    ${message.user_name}
                  <div class="message__user__date"></div>
                    ${message.date}
                  </div>
                  <div class="message__text">
                  <p class="message__content">
                    ${message.content}
                  </p>
                  ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
  })

    .fail(function(data){
    alert('メッセージを送信できません');
      })

    .always(function(data){
    $('.send-btn').prop('disabled', false);
    })
  });

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message').last().data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = ''; //追加するHTMLの入れ物を作る
      messages.forEach(function(message){  //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML); //メッセージを追加
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
      });
    }
  };
    setInterval(reloadMessages, 5000);
});