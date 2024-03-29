import React from 'react';

import MenuBar from 'component/orgamisms/MenuBar';
import * as S from './style';

interface TemplateProps {
  children?: React.ReactNode;
  Modal?: React.ReactNode;
  closeModal?: () => void;
}

const BaseTemplate = ({ children, Modal, closeModal }: TemplateProps) => {
  const ModalSection = (
    <S.ModalContainer>
      {closeModal && <S.ModalBG onClick={closeModal} />}
      <S.Modal open>{Modal}</S.Modal>
    </S.ModalContainer>
  );

  return (
    <S.Template>
      <MenuBar />
      <S.Body>{children}</S.Body>
      {Modal && ModalSection}
    </S.Template>
  );
};

export default BaseTemplate;
