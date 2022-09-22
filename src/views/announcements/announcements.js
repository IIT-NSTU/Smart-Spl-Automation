import React from 'react'
import './announcements.css'
import avatar2 from './../../assets/images/avatars/2.jpg'
import { CForm,
  CCard,
  CCardBody,
  CAvatar,
  CFormFloating, 
  CFormLabel, 
  CFormTextarea,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton
 } from '@coreui/react'

function announcements() {
  return (
    <>
    <div className='header2'>Announcements</div>
    <CForm>
       <div className="mb-3">
        <CFormTextarea size="lg" id="exampleFormControlTextarea1" rows="5" cols="2" placeholder='Announce something to class'></CFormTextarea>
        <CFormInput type="file" size="sm" id="formFileSm"/>
      </div>
      <div>
        <CButton className='announcements-button float-end' color="info" variant="outline" >Post</CButton>
      </div>
      <div>
        <CCard className='card'>
          <CAvatar className='avatar' src={avatar2} />
          <CCardBody className='cardbody'>Post ContextEirmod est amet ea elitr labore, eirmod dolor accusam lorem voluptua diam voluptua tempor tempor ipsum. Et ipsum nonumy dolore et aliquyam, no no justo sea magna. Sed tempor ut labore magna. No kasd erat sadipscing justo magna. Dolore voluptua accusam dolore vero magna sea sed, sit no et et et amet, takimata consetetur erat dolor lorem aliquyam sit elitr diam. Amet stet gubergren et ipsum clita est sit. Dolore diam dolor et diam lorem amet invidunt voluptua, et est ipsum dolore lorem lorem, dolor accusam sanctus nonumy est nonumy lorem ut invidunt. Gubergren eirmod amet sed sed dolore labore.
          <CFormTextarea
            className='formtextarea'
            id="floatingTextarea"
            floatingLabel="Comments"
            placeholder="Leave a comment here"
          ></CFormTextarea>
          </CCardBody>
          
          {/* </CFormFloating> */}
        </CCard>
      </div>
      
    </CForm>
    
      
    </>
  )
}

export default announcements
