import React from 'react';
import { queryAllByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';



test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const header = screen.getByText(/Contact Form/i)
    expect(header).toBeDefined()
    expect(header).toBeTruthy()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const firstName = 'Bob'
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/First Name/i)
    userEvent.type(firstNameInput, firstName)

    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: firstName must have at least 5 characters.')

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const error = screen.queryAllByTestId('error')
    expect(error[0]).toHaveTextContent('Error: firstName must have at least 5 characters.')
    expect(error[1]).toHaveTextContent('Error: lastName is a required field.')
    expect(error[2]).toHaveTextContent('Error: email must be a valid email address.')

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = 'Someone'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'Special'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.click(submitButton)

    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: email must be a valid email address.')
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const firstName = 'Someone'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'Special'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const email = 'someonespecial'
    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    userEvent.click(submitButton)

    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: email must be a valid email address.')
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstName = 'Someone'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const email = 'someone@special.com'
    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(emailInput, email)
    userEvent.click(submitButton)

    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: lastName is a required field.')
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = 'Someone'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'Special'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const email = 'someone@special.com'
    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    userEvent.click(submitButton)

    const firstDisplay = screen.getByTestId('firstnameDisplay')
    const lastDisplay = screen.getByTestId('lastnameDisplay')
    const emailDisplay = screen.getByTestId('emailDisplay')
    const messageDisplay = await screen.queryByTestId('messageDisplay')
    expect(firstDisplay).toHaveTextContent(firstName)
    expect(lastDisplay).toHaveTextContent(lastName)
    expect(emailDisplay).toHaveTextContent(email)
    expect(messageDisplay).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = 'Someone'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'Special'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const email = 'someone@special.com'
    const emailInput = screen.getByLabelText(/Email/i)
    const message = 'heyyy you awsome'
    const messageInput = screen.getByLabelText(/Message/i)
    const submitButton = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    userEvent.type(messageInput, message)
    userEvent.click(submitButton)

    const firstDisplay = screen.getByTestId('firstnameDisplay')
    const lastDisplay = screen.getByTestId('lastnameDisplay')
    const emailDisplay = screen.getByTestId('emailDisplay')
    const messageDisplay = screen.getByTestId('messageDisplay')
    expect(firstDisplay).toHaveTextContent(firstName)
    expect(lastDisplay).toHaveTextContent(lastName)
    expect(emailDisplay).toHaveTextContent(email)
    expect(messageDisplay).toHaveTextContent(message)
});