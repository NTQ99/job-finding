import React from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'
import { formatTime, isOld } from '../../utils'

function CVInfo({job, history}) {
    const isLessThanAday = 'job'

    return (
        <div className={isLessThanAday} onClick={()=> { history.push(`/jobs/`) }}>
            <p className="job__company">{job.jobcategory}</p>
            <p className="job__role">{job.fullname}</p>
            <p className="job__location">{job.email}</p>
            <p className="job__type">{job.jobtype}</p>
            <p className="job__time"> { job.phone }</p>
        </div>
    )
}

export default withRouter(CVInfo)