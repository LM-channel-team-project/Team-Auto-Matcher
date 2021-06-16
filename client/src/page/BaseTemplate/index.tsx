import React from 'react';
import * as S from './style';

type TemplateProps = {
  children?: React.ReactNode;
  Modal?: React.ReactNode;
  closeModal?: () => void;
}

const BaseTemplate = ({ children, Modal, closeModal }: TemplateProps) => {
  const ModalSection = (
    <S.ModalContainer>
      {closeModal && <S.ModalBG onClick={closeModal}/>}
      <S.Modal open >{Modal}</S.Modal>
    </S.ModalContainer>
  );

  return (
    <S.Template>
      <S.Nav>
        {/* Navbar will be added */}
      </S.Nav>
      <S.Body>
        {children}
      </S.Body>
      {Modal && ModalSection}
    </S.Template>
  );
};

export default BaseTemplate;
