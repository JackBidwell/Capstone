require 'faker'
require 'open-uri'

# Clean up the existing records
ActiveRecord::Base.transaction do
  User.destroy_all
  Course.destroy_all
  CourseEnrollment.destroy_all
  Message.destroy_all
  Response.destroy_all
end

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

# Define the list of course titles
course_titles = ["Snatch Techniques", "Clean and Jerk Fundamentals", "Advanced Weightlifting", "Weightlifting Safety", "Competition Preparation"]

# Shuffle the course titles to randomize the order
shuffled_titles = course_titles.shuffle

# Iterate over the shuffled list of course titles
shuffled_titles.each do |title|
  instructor = User.all.sample # Randomly pick an instructor

  # Determine the image filename based on the course title
  image_filename = case title
                   when "Snatch Techniques" then "Snatch.jpeg"
                   when "Clean and Jerk Fundamentals" then "Lasha.jpeg"
                   when "Advanced Weightlifting" then "AdvancedWeightlifting.jpeg"
                   when "Weightlifting Safety" then "Safety.jpeg"
                   when "Competition Preparation" then "Competition.jpeg"
                   else "Default.jpeg" # A default image if none of the titles match
                   end

  # Create the course with the selected title
  course = Course.create!(
    title: title,
    description: Faker::Lorem.sentence(word_count: 15),
    start_time: Faker::Time.forward(days: 23, period: :morning),
    end_time: Faker::Time.forward(days: 30, period: :evening),
    instructor_id: instructor.id
  )

  # Attach the image based on the course title
  course.course_picture.attach(
    io: File.open(File.join(Dir.home, 'Desktop', image_filename)),
    filename: image_filename,
    content_type: 'image/jpeg'
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
