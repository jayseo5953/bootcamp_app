const { Pool } = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: 123,
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();

let month = process.argv.slice(2)[0];

pool
  .query(`
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = student_id 
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name = '${month}'
  ORDER BY teacher
  `)
  .then((res)=>{
    console.log(res.rows.forEach(result => {
      console.log(`${result.cohort}: ${result.teacher}`)
    }))
  })
  .catch(err => {console.error(err.message)})


