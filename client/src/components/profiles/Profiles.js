import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  let slicedProfiles = profiles.slice(0, 9)

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='profiles-page-container'>
          <h1 className='large text-primary'>Network Users</h1>

          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with other users
          </p>

          <div className='profiles'>
            {profiles.length > 0 ? (
              // profiles.map((profile) => (
              //   <ProfileItem key={profile._id} profile={profile} />
              // ))
              slicedProfiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found...</h4>
            )}
          </div>
          <p className='lead'>Want to see more profiles?</p>
          <Link to='/login' className='btn btn-primary'>
            Sign In
          </Link>
        </div>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
