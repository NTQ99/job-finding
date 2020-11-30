import base from './firebase';
import { message } from 'antd';

const db = {
    async getJobs() {
        let jobs = [];
        await base.database().ref('jobs').on("value", async snap => {
            
            jobs = snap.val();
        });
        
        console.log(jobs);
        return jobs;
    },

    async postCVInfo(cvInfo) {
        const cv = {
            fullname: cvInfo.fullname || "",
            email: cvInfo.email || "",
            phone: cvInfo.phone || "",
            file: cvInfo.file || "",
            jobcategory: cvInfo.jobcategory || "",
            jobtype: cvInfo.jobtype || ""
        }
        base.database().ref('cvInfo/' + localStorage.uid).set(cv).catch(error => {
            message.error(error.message, 2);
        });
    },

    async getCVInfo() {
        let cvs = [];
        await base.database().ref('cvInfo/').on("value", async snap => {
            
            cvs = snap.val();
            console.log(snap.val());
        });
        
        return cvs;
    }
}

export default db;