/** @format */

import React, { FC, useCallback } from 'react'
import { Modal, Button } from 'antd'
import { useModal, BaseModalProps } from './ModalRender'

const MyModal: FC<BaseModalProps & { a: number }> = (props: BaseModalProps & { a: number }) => {
  return (
    <Modal visible={props.visible} onOk={props.onHide} onCancel={props.onHide}>
      {props.a}
    </Modal>
  )
}

const WithModal: FC = props => {
  const showModal = useModal(MyModal)

  const handleShow = useCallback(() => {
    showModal({
      a: 123
    })
  }, [showModal])
  return (
    <div>
      showMyModal: <Button onClick={handleShow}>showshow</Button>
    </div>
  )
}

export default WithModal
