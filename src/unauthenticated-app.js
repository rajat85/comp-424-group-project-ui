/** @jsx jsx */
import {jsx} from '@emotion/core';

import React from 'react';
import { useForm } from 'react-hook-form';
import {Input, Button, Spinner, FormGroup, ErrorMessage} from './components/lib';
import {Modal, ModalContents, ModalOpenButton} from './components/modal';
import {useAuth} from './context/auth-context';
import {useAsync} from './utils/hooks';

// function LoginForm({onSubmit, submitButton}) {
//   const {isLoading, isError, error, run} = useAsync()
//   function handleSubmit(event) {
//     event.preventDefault()
//     const {username, password} = event.target.elements
//
//     run(
//       onSubmit({
//         username: username.value,
//         password: password.value,
//       }),
//     )
//   }
//
//   return (
//     <form
//       onSubmit={handleSubmit}
//       css={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'stretch',
//         '> div': {
//           margin: '10px auto',
//           width: '100%',
//           maxWidth: '300px',
//         },
//       }}
//     >
//       <FormGroup>
//         <label htmlFor="username">Username</label>
//         <Input id="username" />
//       </FormGroup>
//       <FormGroup>
//         <label htmlFor="password">Password</label>
//         <Input id="password" type="password" />
//       </FormGroup>
//       <div>
//         {React.cloneElement(
//           submitButton,
//           {type: 'submit'},
//           ...(Array.isArray(submitButton.props.children)
//             ? submitButton.props.children
//             : [submitButton.props.children]),
//           isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
//         )}
//       </div>
//       {isError ? <ErrorMessage error={error} /> : null}
//     </form>
//   )
// }

function UnauthenticatedApp() {
  // const {login, register} = useAuth();
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        name="firstName"
        placeholder="Rajat"
        ref={register({
          required: "this is a required",
          maxLength: {
            value: 2,
            message: "Max length is 2"
          }
        })}
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        name="lastName"
        placeholder="Ghosh"
        ref={register({
          required: "this is required",
          minLength: {
            value: 2,
            message: "Min length is 2"
          }
        })}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        name="email"
        placeholder="rajat@example.com"
        type="text"
        ref={register({
          required: "this is required",
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email address"
          }
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        name="password"
        placeholder=""
        type="password"
        ref={register({
          required: "this is required",
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" />
    </form>
  );
}

export default UnauthenticatedApp
