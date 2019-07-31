// import React, {Component} from 'react'
// import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
// import {connect} from 'react-redux'
// //import {getAllProducts} from '../productReducer'
// import NewStudentForm from './NewStudentForm'

// export class AllStudents extends Component {
//   componentDidMount() {
//     this.props.getAllStudents()
//   }

//   render() {
//     return (
//       <div className="allStudents">
//         <h3>Student List</h3>

//         {this.props.AllStudents.map(student => (
//           <div className="student.id" key={student.id}>
//             <Link to={`/students/${student.id}`}>
//               {student.firstName} {student.lastName}
//             </Link>
//             <br />
//             <small>Remove Student</small>

//             <button
//               type="button"
//               onClick={() => this.props.deleteStudent(student.id)}
//             >
//               x
//             </button>
//             <br />
//           </div>
//         ))}
//         <h3>Add A Student Form</h3>
//         <NewStudentForm />
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     AllStudents: state.students.allStudents
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getAllStudents: () => dispatch(getAllStudents()),
//     deleteStudent: id => dispatch(deleteStudent(id))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AllStudents)
