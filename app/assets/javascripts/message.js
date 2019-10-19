$(document).on("turbolinks:load", function () {
  function buildMessage(message){
    var img = message.image ? `<img src="${message.image}">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.content}
                  </p>
                    ${img}
                  </div>`
    return html;
  
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      document.new_message.reset();
      $('.submit-btn').removeAttr('disabled');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })

  
    var reloadMessages = function() {

      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data('message-id');
        $.ajax({
          url: 'api/messages#index {:format=>"json"}',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildMessage(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました。');
        })
      }  
    }

  setInterval(reloadMessages, 5000);
});