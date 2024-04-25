# seeds.rb

require 'faker'

# Clean up the existing records
User.destroy_all
Course.destroy_all
CourseEnrollment.destroy_all
Message.destroy_all
Response.destroy_all

# Helper method to hash passwords
def hash_password(password)
  BCrypt::Password.create(password)
end

# Create Users
10.times do |i|
  User.create!(
    FirstName: Faker::Name.first_name,
    LastName: Faker::Name.last_name,
    email: Faker::Internet.email(domain: 'example'),
    password_digest: hash_password('password'),
    role: rand(0..3)
  )
end

puts 'Created 10 users...'

# Create Courses
5.times do
  instructor = User.all.sample # Randomly pick an instructor
  Course.create!(
    title: Faker::Educator.course_name,
    description: Faker::Lorem.sentence(word_count: 15),
    start_time: Faker::Time.forward(days: 23, period: :morning),
    end_time: Faker::Time.forward(days: 30, period: :evening),
    instructor_id: instructor.id
  )
end

puts 'Created 5 courses...'

# Create Enrollments
Course.find_each do |course|
  15.times do
    student = User.where.not(id: course.instructor_id).sample
    CourseEnrollment.create!(
      user_id: student.id,
      course_id: course.id,
      status: ['active', 'completed', 'withdrawn'].sample
    )
  end
end

puts 'Created course enrollments...'

# Create Messages
10.times do
  user = User.all.sample
  message = Message.create!(
    content: Faker::Lorem.sentence(word_count: 15),
    user_id: user.id
  )
end

puts 'Created 10 messages...'

# Create Responses
Message.find_each do |message|
  responders = User.where.not(id: message.user_id) # Exclude the message author
  2.times do
    responder = responders.sample
    Response.create!(
      content: Faker::Lorem.sentence(word_count: 10),
      message_id: message.id,
      user_id: responder.id
    )
  end
end

puts 'Created responses to messages...'
