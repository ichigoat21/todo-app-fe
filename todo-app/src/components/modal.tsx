import { Button } from "./button"
import { InputBox } from "./input"

interface ModalProps {
  open: boolean 
  text : string
  ref : any
  onclick : ()=> void
}

export const ModalComponent = (props: ModalProps) => {
  return (
    props.open && (
      <div className="flex justify-center items-center h-screen">
        <div>
          <InputBox reference={props.ref} placeholder="Add Todo..." />
          <div className="mt-4 flex items-center justify-center">
          <Button onclick={props.onclick} text={props.text} />
          </div>
        </div>
      </div>
    )
  )
}
