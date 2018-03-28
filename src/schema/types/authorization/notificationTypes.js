export default `
  type Notification {
    id: ID!
    title: String!
    content: String
    read: Boolean
    sender: User!
    receiver: User!
    updated_at: Date!
    created_at: Date!
  }

  extend type Mutation {
    setNotificationRead(id: ID!): Notification!
    testNotification(from: String!, to: String!, title: String, content: String): Notification!
    insertNotification(to: String!, title: String, content: String): Notification!
  }

  extend type Query {
    getNotifications: [Notification!]!
  }
`;
