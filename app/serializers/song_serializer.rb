class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :user_id, :file

  include Rails.application.routes.url_helpers
  
end
