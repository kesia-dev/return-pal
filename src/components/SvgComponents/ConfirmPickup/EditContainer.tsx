import Reveal from '@components/common/reveal'
import Edit from './Edit'
import { Button } from '@components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function EditContainer({
  onClick,
  onFinish,
  isShowingIcon = true,
}: {
  onClick?: () => void
  onFinish?: () => void
  isShowingIcon?: boolean
}) {
  return (
    <div className="flex h-full items-center justify-center">
      {isShowingIcon ? (
        <Reveal>
          <Button
            onClick={onClick}
            className="rounded-full bg-transparent px-0 py-0 hover:bg-transparent"
          >
            <div className="h-[18px] w-[18px] sm:h-[26.5px] sm:w-[26.5px] md:h-[35px] md:w-[35px]">
              <Edit />
            </div>
          </Button>
        </Reveal>
      ) : (
        <Reveal>
          <Button
            className="h-[18px] w-[18px] bg-transparent px-0 py-0 transition-opacity hover:bg-transparent hover:opacity-60 sm:h-[26.5px] sm:w-[26.5px] md:h-[35px] md:w-[35px]"
            onClick={onFinish}
          >
            <FontAwesomeIcon
              color="green"
              height={'auto'}
              width={'auto'}
              icon={faCircleCheck}
            />
          </Button>
        </Reveal>
      )}
    </div>
  )
}
