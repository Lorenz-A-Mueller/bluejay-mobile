import { gql } from '@apollo/client';

export const logInValidationQuery = gql`
  query ($userNumber: String!, $userPassword: String!) {
    customer(search: { number: [$userNumber, $userPassword] }) {
      last_name
    }
  }
`;

export const validateSessionTokenQuery = gql`
  query {
    customerSession {
      id
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
  mutation (
    $customer: ID
    $category: String
    $title: String
    $messages: [Int]
  ) {
    createNewTicket(
      customer_id: $customer
      category: $category
      title: $title
      messages: $messages
    ) {
      ticket_number
    }
  }
`;

export const createMessageMutation = gql`
  mutation ($customerID: ID!, $content: String!) {
    createNewMessage(customer_id: $customerID, content: $content) {
      id
    }
  }
`;
