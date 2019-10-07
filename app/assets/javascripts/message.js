$(function(){
  function buildMessage(message){
    var img = message.image ? `<img src="${message.image}">` : "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}<br>  
                        ${ img }
                      </p>
                     </div>
                   </div>
                 </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(url);
    
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
});