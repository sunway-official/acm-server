export default `
  type Notification {
    id: ID!
    title: String!
    content: String
    read: Boolean
    user: User!
    updatedAt: Date!
    createdAt: Date!
  }

  extend type Mutation {
    setNotificationRead: Notification!
    testNotification(from: String!, to: String!, title: String, content: String): Notification!
  }

  extend type Query {
    getNotification: [Notification!]!
  }
`;
