# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


u1 = User.create(email:'dan@random-email.com', password:'password')
u2 = User.create(email:'oliver@random-email.com', password:'password')
u3 = User.create(email:'maddie@random-email.com', password:'password')
u4 = User.create(email:'eric@random-email.com', password:'password')
u5 = User.create(email:'glenfield@random-email.com', password:'password')


s1_1 = Song.create(title: 'Test Track 1', artist: 'Dan', user_id: u1.id)
s1_2 = Song.create(title: 'Test Track 2', artist: 'Mad', user_id: u1.id)
s1_3 = Song.create(title: 'Test Track 3', artist: 'Ollie', user_id: u1.id)

s2_1 = Song.create(title: 'Test Track 1', artist: 'Dan', user_id: u2.id)
s2_2 = Song.create(title: 'Test Track 2', artist: 'Mad', user_id: u2.id)
s2_3 = Song.create(title: 'Test Track 3', artist: 'Ollie', user_id: u2.id)

s3_1 = Song.create(title: 'Test Track 1', artist: 'Dan', user_id: u3.id)
s3_2 = Song.create(title: 'Test Track 2', artist: 'Mad', user_id: u3.id)
s3_3 = Song.create(title: 'Test Track 3', artist: 'Ollie', user_id: u3.id)

s4_1 = Song.create(title: 'Test Track 1', artist: 'Dan', user_id: u4.id)
s4_2 = Song.create(title: 'Test Track 2', artist: 'Mad', user_id: u4.id)
s4_3 = Song.create(title: 'Test Track 3', artist: 'Ollie', user_id: u4.id)

s5_1 = Song.create(title: 'Test Track 1', artist: 'Dan', user_id: u5.id)
s5_2 = Song.create(title: 'Test Track 2', artist: 'Mad', user_id: u5.id)
s5_3 = Song.create(title: 'Test Track 3', artist: 'Ollie', user_id: u5.id)
