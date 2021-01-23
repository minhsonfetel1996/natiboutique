import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row } from "reactstrap";

const NotFoundPage = () => {
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <Row>
        <Container fluid>
          <h4>{t('LABEL_NOT_FOUND_PAGE')}</h4>
        </Container>
      </Row>
    </React.Fragment>
  );
};
export default NotFoundPage;
