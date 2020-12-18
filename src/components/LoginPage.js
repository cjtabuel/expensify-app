import React from 'react'
import { connect } from 'react-redux'
import { startLoginGoogle, startLoginFacebook, startLoginTwitter, startLoginGithub } from '../actions/auth'
import LoginPage2 from '../components/LoginPage2'

const LoginPage = ({ startLoginGoogle, startLoginFacebook, startLoginTwitter, startLoginGithub }) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <p>Track your expenses</p>
        <button className="button" onClick={startLoginGoogle}>Login with Google</button>
        <button className="button" onClick={startLoginFacebook}>Login with Facebook</button>
        <button className="button" onClick={startLoginTwitter}>Login with Twitter</button>
        <button className="button" onClick={startLoginGithub}>Login with GitHub</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startLoginTwitter: () => dispatch(startLoginTwitter()),
  startLoginGithub: () => dispatch(startLoginGithub())
})

export { LoginPage }
export default connect(undefined, mapDispatchToProps)(LoginPage)
