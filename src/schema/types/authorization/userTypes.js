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

  username: String!

  # User gender
  gender: Gender!

  # User birthdate
  dob: Date

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

  # phone number
  phone_number: String!

  # Bio
  bio: String

  # Language
  language: String

  # Avatar
  avatar: String

  # Linkedin id
  linkedin_id: String

  # Facebook id
  facebook_id: String

  # Twitter id
  twitter_id: String

  # Address
  address: Address

  # Position
  position: String

  # Organization
  organization: String

  # User interest
  interested_in: String

  # permissions of users
  permissions: [Permission!]!

  # The current conference session of each user
  currentConference: Conference

  # personal feedback
  activityFeedback: [ActivityFeedback!]

  # Organizer detail
  organizerDetails: [OrganizerDetail!]

  # Conference Attendees
  conferenceAttendees:[ConferenceAttendee!]

  # conference
  conferences: [Conference!]

  # News
  news: [News!]

  # news photos
  newsPhotos: [NewsPhoto!]

  # number of photos
  totalPhotos: Int!

  # news likes
  newsLikes: [NewsLike!]

  # news comments
  newsComments: [NewsComment!]

  # questions
  questions: [Question!]

  # answers
  answers: [Answer!]

  # papers
  papers: [Paper!]!

  # rating
  rating: Float!

  # followers count
  followers_count: Int!

  # folowings count
  followings_count: Int!
}
enum Gender {
  male
  female
  unknown
}

extend type Subscription {
  Me: User!
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
  # Get current conference session of user
  getCurrentConference: Conference!

  getTopCommentUsers(limit: Int = 10): [User!]!

  searchUsers(params: String!, pagination: UserSearchPagination): [User!]!
}

input UserSearchPagination {
  limit: Int!
  offset: Int!
}

extend type Mutation {
  # Register new user, need to remove Authorization and RefreshToken headers
  register(
    # User firstname
    firstname: String!
    # User lastname
    lastname: String!
    username: String!
    bio: String
    organization: String
    # User email address
    email: String!
    # User password
    password: String!
  ): User!
  # Login to system, need to remove Authorization and RefreshToken headers
  login(
    username: String
    # User email address
    email: String
    # User password
    password: String!
  ): LoginResponse

  # Update user avatar
  updateAvatar(avatarUrl: String): User!

  # Update user info, need auth headers
  updateMe(
    # User first name
    firstname: String,
    # User last name
    lastname: String,
    # User birthdate
    dob: Date,
    # User gender
    gender: Gender,
    # More information about user
    bio: String,
    # User language
    language: String,
    # Avatar url
    avatar: String,
    # User's organization
    organization: String,
    # User's position
    position: String,
    # User interest
    interested_in: String,
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

  # Switch current conference session of user
  switchCurrentConference(
    conference_id: ID!
  ): Conference!

  addUserNotificationKey(key: String!): User!

  inviteUser(role_id: ID!, email: String!, title: String!, firstname: String!, lastname: String!): User!
}

type LoginResponse {
  token: String!
  refreshToken: String!
}
`;
