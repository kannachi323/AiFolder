import { useReducer } from 'react';

export function useFormReducer() {
    // Initial state for the form
const initialState = {
    email: '',
    password: '',
    repeatPassword: '',
    terms: false,
    error: '',
    loading: false
  };
  
  // Reducer function
  function formReducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'SET_ERROR':
        return { ...state, error: action.error };
      case 'SET_LOADING':
        return { ...state, loading: action.loading };
      default:
        return state;
    }
  }

  return useReducer(formReducer, initialState);
}
