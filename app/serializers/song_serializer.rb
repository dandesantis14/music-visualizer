class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :track
end
