$(function() {
  
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  	  var html =
  	    `<div class="main__message__box" data-message-id= "${message.id}">
          <div class="main__message__box__top">
            <div class="main__message__box__top__name">
              ${message.user_name}
            </div>
            <div class="main__message__box__top__time">
              ${message.date}
            </div>
          </div>
          <div class="main__message__box__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
    return html;
  }
  
  function ScrollToNewMessage(){
    $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit',function(e) {
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
	  .done(function(data){
		  var html = buildHTML(data);
	  	$('.main__message').append(html);
      ScrollToNewMessage();
	  	$('.main__footer__text').val('');
	  	$(".main__footer__send-button").prop('disabled', false);
	  })
	  .fail(function(){
	    alert('error');
	  });
  });

    var interval = setInterval(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.main__message__box').filter(":last").data('messageId')
    $.ajax({
      url: location.href.json,
      data: { last_id: last_message_id },
      type: "GET",
      dataType: 'json'
    })
    .done(function(data){
      var insertHTML = '';
      data.forEach(function(message){
      insertHTML = buildHTML(message);         
      $('.main__message').append(insertHTML)
      ScrollToNewMessage();
      });
    })
    .fail(function(data){
      alert('自動更新に失敗しました');
    })
  } else{
      clearInterval(interval);
    }} , 5000 )
});