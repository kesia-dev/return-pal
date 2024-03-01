import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Default headerType is desktop
function SignoutButton({

  headerType = 'desktop',
}: {
  headerType?: 'desktop' | 'mobile'
}) {

  const onClick = (): void => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    window.location.reload();
  }

  return (
    <Link href="/">
      {headerType === 'desktop' ? (        
          <Button variant="secondary" className="h-9 w-24" onClick={onClick}>
            Sign Out
          </Button>
        ) : (
          <Button
            variant="link"
            className="text-secondary h-fit p-0 text-base hover:text-primary hover:no-underline"
          onClick={onClick}
          >
            <p className="flex gap-x-2">
              <FontAwesomeIcon icon={faRightToBracket} width={'17'} />
              Sign Out
            </p>
          </Button>
        )}
    </Link>
  )
}

export default SignoutButton
