import React from 'react'
import { connect } from 'react-redux'
import './index.css'
import Job from '../Job'
import Loader from '../Loader'
import {fetchJobs, fetchMoreJobs} from '../../actions'


class JobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: this.props.jobs
        }
    }

    render() {
        return (
            <div className="job-list">
                <h3 className="job-list__text"> Top Jobs </h3>
                <div className="job-listing">
                    {this.state.jobs.map(job => <Job key={job.id} job={job} />)}
                </div>
            </div>
        )
    }
    
}

export default JobList;