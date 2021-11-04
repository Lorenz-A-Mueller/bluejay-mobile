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
  mutation ($customer: ID, $category: String, $title: String) {
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
