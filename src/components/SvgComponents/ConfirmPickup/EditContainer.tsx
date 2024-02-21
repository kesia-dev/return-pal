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
    <div className="justify-center sm:flex md:min-w-[45px]">
      <Reveal>
        {isShowingIcon ? (
          <Button
            onClick={onClick}
            className="rounded-full bg-transparent hover:bg-transparent"
          >
            <div className="h-[20px] w-[20px] sm:mt-4 sm:h-[28px] sm:w-[28px]">
              <Edit />
            </div>
          </Button>
        ) : (
          <Button
            className="bg-transparent px-0 py-0 transition-opacity hover:bg-transparent hover:opacity-60"
            onClick={onFinish}
          >
            <FontAwesomeIcon
              color="green"
              width={28}
              height={28}
              icon={faCircleCheck}
            />
          </Button>
        )}
      </Reveal>
    </div>
  )
}
