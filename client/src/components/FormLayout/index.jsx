import React from 'react'
import Container from 'react-bootstrap/esm/Container';

function FormLayout(props) {
  const { children } = props;
  return (
    <Container className="mt-6 px-6">{children}</Container>
  )
}

export default FormLayout;