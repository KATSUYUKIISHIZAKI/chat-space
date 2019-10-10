$(function(){
  function buildHTML(message){
    
    var image = message.image.url ? `<img class="message__image" src="${message.image.url}">`: "";
    var html = `<div class="message">
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
      alert('error');
    })
    .always(function(data){
      $('.send-btn').prop('disabled', false);
    })
  })
})