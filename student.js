const { Pool } = require('pg');

const pool = new Pool ({
  user: 'vagrant',
  password: 123,
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();
let month = process.argv.slice(2)[0];
let length = process.argv.slice(2)[1];
pool
  .query(`
  SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort_name
  FROM students
  JOIN cohorts
  ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE '${month}%'
  LIMIT ${length};
  `)
  .then((res)=>{
    console.log(res.rows.forEach(result => {
      console.log(`${result.student_name} is currently in the ${result.cohort_name}'s cohort`)
    }))
  })
  .catch(err => {console.error(err.message)})


