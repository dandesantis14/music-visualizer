class User < ApplicationRecord
    has_secure_password
    has_many :songs, dependent: :destroy

    validates :email, email: true
    validates :email, uniqueness: true
end
