class User < ApplicationRecord
    has_many :songs, dependent: :destroy

    validates :email, uniqueness: true
end
