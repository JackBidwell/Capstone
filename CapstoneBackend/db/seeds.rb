# Ensure to have `has_secure_password` in User model for password digesting
# It requires bcrypt, make sure to have gem 'bcrypt', '~> 3.1.7' in your Gemfile

# Create Users
user1 = User.create(
  FirstName: "John",
  LastName: "Doe",
  email: "john.doe@example.com",
  password: "123",
  password_confirmation: "123",
  admin: true,
  member: true,
  trialuser: false,
  instructor: false
)

user2 = User.create(
  FirstName: "Jane",
  LastName: "Smith",
  email: "jane.smith@example.com",
  password: "123",
  password_confirmation: "123",
  admin: false,
  member: true,
  trialuser: false,
  instructor: true
)

user3 = User.create(
  FirstName: "Alice",
  LastName: "Johnson",
  email: "alice.johnson@example.com",
  password: "123",
  password_confirmation: "123",
  admin: false,
  member: true,
  trialuser: true,
  instructor: false
)

# Handle creation failures (useful for debugging during development)
[user1, user2, user3].each do |user|
  unless user.persisted?
    puts "Failed to save #{user.FirstName}: #{user.errors.full_messages.join(', ')}"
  end
end

# Create Courses
course1 = Course.create(
  title: "Ruby on Rails Basics",
  description: "An introductory course on Ruby on Rails.",
  start_time: DateTime.now,
  end_time: DateTime.now + 1.week,
  instructor_id: user2.id
)

course2 = Course.create(
  title: "Advanced Ruby Programming",
  description: "Deep dive into Ruby programming techniques.",
  start_time: DateTime.now + 1.day,
  end_time: DateTime.now + 1.week + 1.day,
  instructor_id: user2.id
)

# Handle course creation failures
[course1, course2].each do |course|
  unless course.persisted?
    puts "Failed to save #{course.title}: #{course.errors.full_messages.join(', ')}"
  end
end

# Create Messages
message1 = Message.create(
  content: "Welcome to the course!",
  sent_at: DateTime.now,
  user_id: user2.id
)

message2 = Message.create(
  content: "Thank you for joining!",
  sent_at: DateTime.now + 1.hour,
  user_id: user1.id
)

# Create Course Enrollments
enrollment1 = CourseEnrollment.create(
  user_id: user1.id,
  course_id: course1.id,
  enrollment_date: Date.today,
  status: "active"
)

enrollment2 = CourseEnrollment.create(
  user_id: user3.id,
  course_id: course1.id,
  enrollment_date: Date.today,
  status: "trial"
)

# Check and report any errors in enrollments
[enrollment1, enrollment2].each do |enrollment|
  unless enrollment.persisted?
    puts "Failed to enroll user #{enrollment.user_id} in course #{enrollment.course_id}: #{enrollment.errors.full_messages.join(', ')}"
  end
end

puts "Database has been seeded."
