import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Default headerType is desktop
function SigninButton({
  headerType = 'desktop',
}: {
  headerType?: 'desktop' | 'mobile'
}) {
  return (
    <Link href="/signin">
      {headerType === 'desktop' ? (        
          <Button variant="secondary" className="h-9 w-24">
            Sign In
          </Button>
        ) : (
          <Button
            variant="link"
            className="text-secondary h-fit p-0 text-base hover:text-primary hover:no-underline"
          >
            <p className="flex gap-x-2">
              <FontAwesomeIcon icon={faRightToBracket} width={'17'} />
              Sign In
            </p>
          </Button>
        )}
    </Link>
  )
}

export default SigninButton
