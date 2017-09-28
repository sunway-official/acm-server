export default `
type User {
  # The ID of user
  id: ID!

  # User firstname
  firstname: String!

  # User lastname
  lastname: String!

  # User email address
  email: String!

  # User birthdate
  dob: Date

  # User gender
  gender: Gender!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

  # Bio
  bio: String!

  # Language
  language: String!

  # Avatar
  avatar: String!

  # Linkedin id
  linkedin_id: String!

  # Facebook id
  facebook_id: String!

  # Twitter id
  twitter_id: String!


  # permissions of users
  permissions: [Permission!]!

  # personal feedback
  activityFeedback: [ActivityFeedback!]!

  # Organizer detail
  organizerDetails: [OrganizerDetail!]!

  # Conference Attendees
  conferenceAttendees:[ConferenceAttendee!]!

  # conference
  conferences: [Conference!]!

  # News
  news: [News!]!

  # news photos
  newsPhotos: [NewsPhoto!]!

  # news likes
  newsLikes: [NewsLike!]!

  # news comments
  newsComments: [NewsComment!]!

  # questions
  questions: [Question!]!

  # answers
  answers: [Answer!]!
}
enum Gender {
  male
  female
  unknown
}
extend type Query {
  # Get information about all users
  getAllUsers: [User!]!
  # Get user by ID
  getUserByID(
    # User ID
    userId: ID!): User!
  # Get information about current logged in user, need Authorization and RefreshToken headers
  me: User!
}

extend type Mutation {
  # Register new user, need to remove Authorization and RefreshToken headers
  register(
    # User firstname
    firstname: String!
    # User lastname
    lastname: String!
    # User email address
    email: String!
    # User password
    password: String!
  ): User!
  # Login to system, need to remove Authorization and RefreshToken headers
  login(
    # User email address
    email: String!
    # User password
    password: String!
  ): LoginResponse

  # Update user info, need auth headers
  updateMe(
    # User first name
    firstname: String!,
    # User last name
    lastname: String!,
    # User birthdate
    dob: Date,
    # User gender
    gender: Gender!,
    # More information about user
    bio: String,
    # User language
    language: String,
    # Avatar url
    avatar: String,
    # Linkin ID
    linkedin_id: String,
    # Facebook ID
    facebook_id: String,
    # Twiiter ID
    twitter_id: String): User!

  # Update user password, need auth headers
  updatePassword(oldPassword: String, newPassword: String!): User!

  # Send forgot password email to user inbox
  sendForgotPasswordEmail(
    # Email address to send the forgot token
    email: String!): RequestResult!
  # Check user forgot password token
  checkForgotPasswordToken(
    # Token to check valid
    token: String!): RequestResult!
  # Reset user password, requires the token from the forgot password email
  resetUserPassword(token: String!, newPassword: String!): RequestResult!

  # delete user with id
  deleteUser(id: ID!): User!
}

type LoginResponse {
  token: String!
  refreshToken: String!
}
`;
