
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { X } from 'lucide-react'

// Usage guide
//    const [isModalOpen, setModalOpen] = useState(false)
//   <button
//     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//     onClick={() => setModalOpen(true)}
//   >
//     Open Modal
//   </button>

//   <Modal
//     isOpen={isModalOpen}
//     onClose={() => setModalOpen(false)}
//     title="Welcome"
//   >
//     <p className="text-sm text-gray-700">This is a reusable modal built with TypeScript.</p>
//   </Modal>

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className = '' }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all ${className}`}>
              <div className="flex justify-between items-start mb-4">
                {title && (
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
