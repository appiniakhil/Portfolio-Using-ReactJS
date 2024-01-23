import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out !important;
  background: linear-gradient(225deg, #4CAF50 0%, #2196F3 100%);
  box-shadow: 0 10px 20px rgba(33, 150, 243, 0.2);

  &:hover {
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 10px 30px rgba(33, 150, 243, 0.3);
    filter: brightness(1.2);
  }

  @media (max-width: 640px) {
    padding: 12px 0;
    font-size: 18px;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: green;
  font-weight: 600;
  margin-top: 12px;
`;

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const email = form.current.elements.from_email.value;
    const name = form.current.elements.from_name.value;
    const subject = form.current.elements.subject.value;
    const message = form.current.elements.message.value;

    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!message) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, update the state and stop form submission
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    // If all fields are filled, proceed with email sending
    emailjs
      .sendForm('service_suj53z5', 'template_crgw9k4', form.current, 'AE8AqC08nGsNkrqkC')
      .then(
        (result) => {
          setSuccess(true);
          setErrors({});
          form.current.reset();
        },
        (error) => {
          console.error('Error sending email:', error);
          // Handle error if needed
        }
      );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit} autocomplete="off">
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <ContactInput placeholder="Your Name" name="from_name" />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
          <ContactInput placeholder="Subject" name="subject" />
          {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          {errors.message && <ErrorText>{errors.message}</ErrorText>}
          <ContactButton type="submit" value="Send" />
          {success && <SuccessMessage>Email sent successfully!</SuccessMessage>}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
