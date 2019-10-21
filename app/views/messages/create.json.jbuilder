json.content @message.content
json.image @message.image.url
json.user @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id