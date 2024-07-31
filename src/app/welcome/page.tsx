import Welcome from '@/components/Welcome'
import { wixClientServer } from '@/lib/wixClientServer';
import { members } from '@wix/members';
import { FC } from 'react'


const WelcomePage: FC<WelcomePageProps> = async ({}) => {
  
 

  return <div>
    <Welcome />
  </div>
}

export default WelcomePage