import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
       Smart SPL Automation System
      </div>
      <div className="ms-auto">
        All Rights Reserved
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
