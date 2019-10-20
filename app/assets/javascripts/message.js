$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}">` : ``
    var html = `<ul class="main-block__user-name">
                    ${message.user_name}
                    <li class="main-block__user-name__time">
                      ${message.created_at}
                    </li>
                  </ul>
                  <div class="main-block__comments">
                    <p>
                      ${message.content}
                    </p>
                    ${image}
                  </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $(".main").append(html)
      $(".footer__framwork__input-box__form-message").val('')
      $(".footer__framwork__form-submit").prop('disabled', false);
    })
    .fail(function(){
      alert('失敗しました。');
    })
  })

  $('document').ready(function(){
    $(".main").animate({scrollTop:$('.footer__framwork')}, 500, 'swing');
  })

  var reloadMessages = function(message) {
    last_message_id = $("#blog")
    group_id = $(".main-contents__header__block__group-name").data('group_id')
    var url = `/groups/${group_id}/api/messages`
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
      processData: false,
      contentType: false
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
      })
      $('.main').append(insertHTML)
    })
    .fail(function() {
    });
  };
  setInterval(reloadMessages, 3000);
});