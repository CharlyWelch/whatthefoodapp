export const QUERY = 'QUERY';

export function searchTerm(state = '', { type, payload }) {
  switch(type) {

    case QUERY:
      return payload;
    
    default:
      return state;
  }
}