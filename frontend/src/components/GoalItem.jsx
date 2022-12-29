import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
console.log(goal)
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal._id}</h2>
      <h2>{goal.name}</h2>
      <h2>{goal.last_name}</h2>
      <h2>{goal.email}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem
