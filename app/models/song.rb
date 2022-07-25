class Song < ApplicationRecord
    belongs_to :user

    validates :title, presence: true
    validates :artist, presence: true
    validates :file, presence: true

end
