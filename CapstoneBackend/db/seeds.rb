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

# Define the list of course titles and corresponding image URLs
course_data = [
  { title: "Snatch Techniques", url: "https://i.ytimg.com/vi/-TLFe2TWF78/maxresdefault.jpg" },
  { title: "Clean and Jerk Fundamentals", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Lasha_Talakhadze_Rio_2016.jpg/1200px-Lasha_Talakhadze_Rio_2016.jpg" },
  { title: "Advanced Weightlifting", url: "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/CLJN7Z5CL5DVJOKG4EZKJAPIFU.JPG" },
  { title: "Weightlifting Safety", url: "https://barbend.com/wp-content/uploads/2017/02/16523981_889255947883412_214331216_o.jpg" },
  { title: "Competition Preparation", url: "https://www.ironcompany.com/media/magefan_blog/2021/03/Clarence-Kennedy.png" }
]

# Shuffle the course data to randomize the order
shuffled_course_data = course_data.shuffle

# Iterate over the shuffled list of course data
shuffled_course_data.each do |data|
  instructor = User.all.sample # Randomly pick an instructor

  # Create the course with the selected title and image URL
  Course.create!(
    title: data[:title],
    description: Faker::Lorem.sentence(word_count: 15),
    start_time: Faker::Time.forward(days: 23, period: :morning),
    end_time: Faker::Time.forward(days: 30, period: :evening),
    instructor_id: instructor.id,
    course_picture_url: data[:url]
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
