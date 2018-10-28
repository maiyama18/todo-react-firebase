import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeText, submitTodoThunk } from '../store/form'

const TodoForm = props => {
  const { submitting, text } = props
  const { changeText, submitTodoThunk } = props

  return (
    <div>
      <form onSubmit={e => {e.preventDefault(); submitTodoThunk(text)}}>
        <input 
          type="text"
          placeholder="Add New Todo..."
          value={text}
          onChange={e => changeText(e.target.value)}
        />
        <button disabled={submitting}>Add</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  const { submitting, text } = state.form

  return {
    submitting,
    text,
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    submitTodoThunk, 
    changeText,
  }, dispatch),
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TodoForm)
