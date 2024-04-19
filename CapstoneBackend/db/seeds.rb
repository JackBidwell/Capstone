# Create some users
users = User.create([
  { FirstName: "Alice", LastName: "Smith", email: "alice@example.com", password: "123", password_confirmation: "123", role: 0 },
  { FirstName: "Bob", LastName: "Jones", email: "bob@example.com", password: "123", password_confirmation: "123", role: 1 },
  { FirstName: "Carol", LastName: "Taylor", email: "carol@example.com", password: "123", password_confirmation: "123", role: 2 },
  { FirstName: "Dave", LastName: "Brown", email: "dave@example.com", password: "123", password_confirmation: "123", role: 3 }
])

# Create some courses
courses = Course.create([
  { title: "Intermediate Crossfit", description: "Intermediate Crossfit, this class assumes that you know the basics of the movements and gets going right away.", start_time: DateTime.now, end_time: DateTime.now + 1.year, instructor_id: users[3].id },
  { title: "Treadmill haven", description: "Try out this intensive cardio class that takes place in one place.", start_time: DateTime.now, end_time: DateTime.now + 1.year, instructor_id: users[3].id }
])

# Create some messages
messages = Message.create([
  { content: "Welcome to the course!", user_id: users[0].id },
  { content: "Thank you for joining!", user_id: users[1].id }
])

# Create some responses
responses = Response.create([
  { content: "Glad to be here!", message_id: messages[0].id, user_id: users[1].id },
  { content: "You're welcome!", message_id: messages[1].id, user_id: users[0].id }
])

# Create some course enrollments
enrollments = CourseEnrollment.create([
  { user_id: users[0].id, course_id: courses[0].id, status: "active" },
  { user_id: users[1].id, course_id: courses[1].id, status: "active" }
])

puts "Database seeded!"
