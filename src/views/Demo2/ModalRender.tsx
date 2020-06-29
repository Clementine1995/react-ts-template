/** @format */

import React, { FC, useState, useContext, useCallback, useMemo } from 'react'

export interface BaseModalProps {
  visible: boolean
  onHide: () => void
}

export interface ModalContextValue {
  render(Component: React.ComponentType<any>, props: any): void
}

const Context = React.createContext<ModalContextValue>({
  render: () => {
    throw new Error('useModal 必须在ModalRenderer 下级')
  }
})

const ModalRenderer: FC = props => {
  const [modal, setModal] = useState<{
    Comp: React.ComponentType<any>
    props: any
    visible?: boolean
  }>()
  const hide = useCallback(() => {
    setModal(prev => prev && { ...prev, visible: false })
  }, [])

  const render = useCallback<ModalContextValue['render']>((Comp, props) => {
    setModal({ Comp, props, visible: true })
  }, [])

  const value = useMemo(() => ({ render }), [render])
  return (
    <Context.Provider value={value}>
      <div className="modal-container">
        {props.children}
        {!!modal &&
          React.createElement(modal.Comp, {
            ...modal.props,
            visible: modal.visible,
            onHide: hide
          })}
      </div>
    </Context.Provider>
  )
}

export function useModal<P extends BaseModalProps>(Modal: React.ComponentType<P>) {
  const renderer = useContext(Context)

  return useCallback(
    (props: Omit<P, keyof BaseModalProps>) => {
      renderer.render(Modal, props)
    },
    [Modal, renderer]
  )
}

export default ModalRenderer
