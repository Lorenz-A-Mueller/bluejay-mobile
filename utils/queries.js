import { gql } from '@apollo/client';

export const logInValidationQuery = gql`
  query ($userEmail: String!, $userPassword: String!) {
    customer(search: { emailAndPassword: [$userEmail, $userPassword] }) {
      last_name
    }
  }
`;

export const validateSessionTokenQuery = gql`
  query {
    customerSession {
      id
      customer_id
    }
  }
`;

export const validateSessionTokenWhenSendingQuery = gql`
  query {
    customerSession {
      customer_id
    }
  }
`;

export const createTicketMutation = gql`
  mutation ($customer: ID!, $category: ID!, $title: String!) {
    createNewTicket(
      customer_id: $customer
      category: $category
      title: $title
    ) {
      id
    }
  }
`;

export const createMessageMutation = gql`
  mutation ($ticketID: ID!, $content: String!) {
    createNewMessage(ticket_id: $ticketID, content: $content) {
      id
    }
  }
`;

export const getTicketByCustomerIdQuery = gql`
  query ($customerID: ID!) {
    ticket(search: { customer_id: $customerID }) {
      id
      title
      created
      category
      status
    }
  }
`;

export const getMessagesQuery = gql`
  query ($ticketID: ID) {
    messages(ticket_id: $ticketID) {
      created
      content
      id
      responder_id
    }
  }
`;

export const getEmployeeFirstNameQuery = gql`
  query ($employeeID: ID!) {
    employee(search: { id: $employeeID }) {
      first_name
    }
  }
`;

export const deleteSessionMutation = gql`
  mutation {
    deleteCustomerSession {
      id
      token
      customer_id
      expiry_timestamp
    }
  }
`;

export const getCustomerNameQuery = gql`
  query ($customerID: ID!) {
    customer(search: { id: $customerID }) {
      first_name
    }
  }
`;

export const createCustomerMutation = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $dob: Date!
  ) {
    createCustomer(
      first_name: $firstName
      last_name: $lastName
      email: $email
      password: $password
      phone_number: $phoneNumber
      dob: $dob
    ) {
      id
      number
      first_name
      last_name
      email
      phone_number
      dob
      status
    }
  }
`;

// export const createCustomerMutation = gql`
//   mutation {
//     createCustomer(
//       first_name: "abc"
//       last_name: "abc"
//       email: "abc.abc@asdf"
//       password: "asdf"
//       phone_number: "10001"
//       dob: "12-12-1990"
//     ) {
//       id
//       number
//       first_name
//       last_name
//       email
//       phone_number
//       dob
//       status
//     }
//   }
// `;
